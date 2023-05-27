import { Injectable } from '@nestjs/common';
import { AdSet, AdSetDocument } from '@monorepo/type';
import axios from 'axios';
import { createNameDateTime } from '../../utils/createNameDateTime';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { AdService } from '../mongo/ad/ad.service';
import { AccountModelService } from '../mongo/account/account-model.service';
import PDFDocument from 'pdfkit';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const s3 = new S3Client({
    region: process.env.S3_REGION
});

@Injectable()
export class PdfService {
    constructor(
        private adService: AdService,
        private accountModelService: AccountModelService,
        @InjectModel(AdSet.name) private adSetModel: Model<AdSetDocument>,
    ) {}

    async createPdf(adSet: AdSetDocument, accountId: string): Promise<void> {

        console.log('creatingPdf', adSet, accountId);

        const ads = await this.adService.getAdsByAdSetId({ adSetId: adSet._id.toString() });
        if (!ads) {
            throw new Error(`ad set ads not found`);
        }

        const account = await this.accountModelService.findOneById(accountId);

        const doc = new PDFDocument;
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));

        console.log('creatingPdf - entering loop with ads: ', ads);


        for (const ad of ads) {

            const imageLocations = [];

            ad.cardLocations.forEach(location => {
                if (location) {
                    imageLocations.push(location.cardLocation);
                }
            });

            const promises = imageLocations.map(location => axios.get(location, { responseType: 'arraybuffer' }).then(res => res.data));

            const images = await Promise.all(promises);

            const pageWidth = doc.page.width;
            const pageHeight = doc.page.height;
            const border = 30;
            const imageSpace = 15;
            const imageWidth = (pageWidth - 2 * border - imageSpace) / 2;
            const imageHeight = imageWidth;
            const textSpace = 35;

            // Add the ad copy and audience
            const adCopy = ad.copyTextEdited ? ad.copyTextEdited : ad.copyText;
            const audience = ad.bestFitReasoning;
            const source = ad.source;
            const reviewDate = ad.reviewDate;

            doc.fontSize(10)
                .text("Review Date: ", border, border, { underline: false, continued: true })
                .text(reviewDate, { underline: false, align: 'left' })
                .moveDown()
                .text("Review Source: ", { underline: false, continued: true })
                .text(source, { underline: false, align: 'left' })
                .moveDown()
                .text("Ad Copy: ", { underline: false, continued: true })
                .text(adCopy, { underline: false, align: 'left' })
                .moveDown()
                .text("Ad Audience: ", { underline: false, continued: true })
                .text(audience, { underline: false, align: 'left' });

            const textHeight = doc.y + textSpace;

            // Draw the 2x2 images
            for (let i = 0; i < images.length; i++) {
                const x = border + (i % 2) * (imageWidth + imageSpace);
                const y = textHeight + Math.floor(i / 2) * (imageHeight + imageSpace);
                doc.image(images[i], x, y, { width: imageWidth });
            }

            if (ads.indexOf(ad) !== ads.length - 1) {
                doc.addPage(); // add new page only if the current ad is not the last one
            }
        }

        doc.on('end', async () => {
            console.log('creatingPdf - end event');
            const pdfData = Buffer.concat(buffers);

            const folderName = `ads/${account.country}/${account.provinceState}/${account.city}/${account.companyName}/PDFs`

            // Define the S3 key and parameters
            const key = `${folderName}/${adSet.nameDateTime}.pdf`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
                Body: pdfData,
                ContentType: 'application/pdf'
            };

            // Upload the PDF to S3
            try {
                const result = await s3.send(new PutObjectCommand(params));
                console.log('PDF uploaded to S3:', result);

                // Save the location of the PDF in the database
                const adSetToUpdate = await this.adSetModel.findById(adSet._id);
                adSetToUpdate.pdfLocation =  `${process.env.CF_DOMAIN}/${key}`;

                await adSetToUpdate.save();

            } catch (error) {
                console.error('Error uploading PDF to S3:', error);
                throw error;
            }
        });

        doc.end();
    }
}
