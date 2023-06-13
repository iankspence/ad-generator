import { Injectable } from '@nestjs/common';
import { AdSet, AdSetDocument, CreatePdfJob } from '@monorepo/type';
import axios from 'axios';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { AdService } from '../mongo/ad/ad.service';
import { AccountModelService } from '../mongo/account/account-model.service';
import PDFDocument from 'pdfkit';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formatDateString } from '../../utils/formatDateString';
import { LoggerService } from '../logger/logger.service';

const s3 = new S3Client({
    region: process.env.S3_REGION
});

@Injectable()
export class PdfService {
    constructor(
        @InjectModel(AdSet.name) private adSetModel: Model<AdSetDocument>,
        private accountModelService: AccountModelService,
        private adService: AdService,
        private logger: LoggerService
    ) {
        this.logger.setContext('PdfService');
    }

    async createPdf(createPdfJob: CreatePdfJob): Promise<void> {

        const ads = await this.adService.getAdsByAdSetId({
            adSetId: createPdfJob.adSet._id.toString()
        });
        if (!ads) {
            this.logger.error(`ad set ads not found`);
            return;
        }

        const account = await this.accountModelService.findOneById(createPdfJob.accountId);

        const doc = new PDFDocument;
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));

        let pageNumber = 0;

        for (const ad of ads) {

            const imageLocations = [];

            ad.cardLocations.forEach(location => {
                if (location) {
                    imageLocations.push(`${process.env.CF_DOMAIN}/${location.cardLocation}`);
                }
            });

            const promises = imageLocations.map(location => axios.get(location, { responseType: 'arraybuffer' }).then(res => res.data));

            const images = await Promise.all(promises);

            const pageWidth = doc.page.width;
            const border = 30;
            const imageSpace = 15;
            const imageWidth = (pageWidth - 2 * border - imageSpace) / 2;
            const textSpace = 35;

            const adCopy = ad.copyTextEdited ? ad.copyTextEdited : ad.copyText;
            const source = ad.source;
            const reviewDate = ad.reviewDate;

            pageNumber++;

            doc.fontSize(14)
                .text(`${pageNumber} of ${ads.length}`, doc.page.width - 120, border, { align: 'right' });

            doc.fontSize(14)
                .text("Review Date: ", border, border, { underline: false, continued: true })
                .text(formatDateString(reviewDate), { underline: false, align: 'left' })
                .moveDown()
                .text("Review Source: ", { underline: false, continued: true })
                .text(source, { underline: false, align: 'left' })
                .moveDown()
                .text("Ad Copy: ", { underline: false, continued: true })
                .text(adCopy, { underline: false, align: 'left' })

            const textHeight = doc.y + textSpace;

            for (let i = 0; i < images.length; i++) {
                const x = border + (i % 2) * (imageWidth + imageSpace);
                const y = textHeight + Math.floor(i / 2) * (imageWidth + imageSpace);
                doc.image(images[i], x, y, { width: imageWidth });
            }

            if (ads.indexOf(ad) !== ads.length - 1) {
                doc.addPage();
            }
        }

        doc.on('end', async () => {
            this.logger.verbose(`creatingPdf - end event with adSetNameDateTime: ${createPdfJob.adSet.nameDateTime} `);

            const folderName = `ads/${account.country}/${account.provinceState}/${account.city}/${account.companyName}/PDFs`
            const pdfData = Buffer.concat(buffers);

            const key = `${folderName}/${createPdfJob.adSet.nameDateTime}.pdf`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
                Body: pdfData,
                ContentType: 'application/pdf'
            };

            try {
                const result = await s3.send(new PutObjectCommand(params));
                this.logger.log(`PDF uploaded to S3 - status code: ${result.$metadata.httpStatusCode}`);

                const adSetToUpdate = await this.adSetModel.findById(createPdfJob.adSet._id);
                adSetToUpdate.pdfLocation =  key

                await adSetToUpdate.save();

            } catch (error) {
                this.logger.error('Error uploading PDF to S3:', error);
                throw error;
            }
        });

        doc.end();
    }
}
