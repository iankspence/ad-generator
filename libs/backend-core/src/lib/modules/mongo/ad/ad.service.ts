import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ad, AdDocument } from '@monorepo/type';
import PDFDocument from 'pdfkit';
import axios from 'axios';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.S3_REGION
});

@Injectable()
export class AdService {
    constructor(@InjectModel(Ad.name) private adModel: Model<AdDocument>) {}

    // async createAd(adNameDateTime: string, userId: string, accountId: string, hookCardId: string, hookCardLocation: string,  claimCardId: string, claimCardLocation: string, reviewCardId: string, reviewCardLocation: string, closeCardId: string, closeCardLocation: string, copyText: string, copyTextEdited: string, bestFitAudience: number, bestFitReasoning: string, source: string, reviewDate: string, canvasApps, xRanges, yRanges, lineHeightMultipliers): Promise<Ad> {
    async createAd(adNameDateTime: string, userId: string, accountId: string, cardIds: Ad["cardIds"], cardLocations: Ad["cardLocations"], copyText: string, copyTextEdited: string, bestFitAudience: number, bestFitReasoning: string, source: string, reviewDate: string, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions: Ad["filteredTextPositions"], themeId: Ad["themeId"]): Promise<Ad> {

        const newAd = new this.adModel({ adNameDateTime, userId, accountId, cardIds, cardLocations, copyText,  copyTextEdited, bestFitAudience, bestFitReasoning, source, reviewDate, adStatus: 'fresh', deliveryType: null, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions, themeId});

        // Generate the PDF after saving the ad
        newAd.save().then(ad => {
            console.log('Ad saved to MongoDB:', ad)
            // this.createPdf(ad);
        });

        return newAd;
    }

    async updateAd(editAdId, adNameDateTime, userId, accountId, cardIds, cardLocations, copyText, copyTextEdited, bestFitAudience, bestFitReasoning, source, reviewDate, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions: Ad["filteredTextPositions"], themeId: Ad["themeId"]): Promise<Ad> {
        const adToUpdate = await this.adModel.findById(editAdId);
        if (!adToUpdate) throw new Error('Ad not found');

        // comment fields which should not be updated
        // adToUpdate.adNameDateTime = adNameDateTime;
        // adToUpdate.userId = userId;
        // adToUpdate.accountId = accountId;
        adToUpdate.cardIds = cardIds;
        adToUpdate.cardLocations = cardLocations;
        adToUpdate.copyText = copyText;
        adToUpdate.copyTextEdited = copyTextEdited;
        adToUpdate.bestFitAudience = bestFitAudience;
        adToUpdate.bestFitReasoning = bestFitReasoning;
        adToUpdate.source = source;
        adToUpdate.reviewDate = reviewDate;
        adToUpdate.userControlledAttributes = userControlledAttributes;
        adToUpdate.xRanges = xRanges;
        adToUpdate.yRanges = yRanges;
        adToUpdate.lineHeightMultipliers = lineHeightMultipliers;
        adToUpdate.filteredTextPositions = filteredTextPositions;
        adToUpdate.themeId = themeId;

        await adToUpdate.save();

        return adToUpdate;
    }

    async getAdsByAccountId(accountId: string) {
        try {
            return this.adModel.find({ accountId }).exec();
        } catch (error) {
            console.error('Error fetching ads:', error);
            throw error;
        }
    }

    async copyAd(adId: string): Promise<Ad> {
        const adToCopy = await this.adModel.findById(adId);

        const newAd = new this.adModel({
            ...adToCopy.toObject(),
            _id: new Types.ObjectId()
        });

        await newAd.save();
        console.log('Ad copied to MongoDB:', newAd)
        return newAd;
    }

    async deleteAd(adId: string): Promise<void> {
        const ad = await this.adModel.findById(adId);
        if (!ad) {
            throw new NotFoundException('Ad not found');
        }
        await this.adModel.deleteOne({ _id: adId });
    }

    async createPdf(ad: AdDocument) {
        const doc = new PDFDocument;
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfData = Buffer.concat(buffers);

            // Define the S3 key and parameters
            const key = `ads/ad_${ad._id}.pdf`;
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
            } catch (error) {
                console.error('Error uploading PDF to S3:', error);
                throw error;
            }
        });

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

        doc.end();
    }
}
