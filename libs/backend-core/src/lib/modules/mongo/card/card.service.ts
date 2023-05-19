import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {AccountDocument, Card, CardDocument, ReviewDocument, CopyDocument, Copy, Ad} from "@monorepo/type";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {AdService} from "../ad/ad.service";
import { createAdNameDateTime } from '../../../utils/createAdNameDateTime';

const s3 = new S3Client({
    region: process.env.S3_REGION
});

@Injectable()
export class CardService {
    constructor(
        @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
        @InjectModel(Copy.name) private readonly copyModel: Model<CopyDocument>,
        private readonly adService: AdService,

) {}

    async saveCanvases(canvases: Array<{canvasName: string, dataUrl: string, sourceTextId: string, sourceText: string, sourceTextEdited: string}>, userId: string, account: AccountDocument, review: ReviewDocument, copy: CopyDocument, themeId: string, backgroundImageLocation: string, maskLocations: {maskLocation: string, maskName: string}[], canvasApps: Ad["canvasAppStages"], xRanges: Ad["xRanges"], yRanges: Ad["yRanges"], lineHeightMultipliers: Ad["lineHeightMultipliers"]) {
        const folderName = `ads/${account.country}/${account.provinceState}/${account.city}/${account.companyName}`
        const results = [];

        const cardIds = {};
        const cardLocations = {};

        const timeZone = 'America/Edmonton'
        const adNameDateTime = createAdNameDateTime(timeZone)

        for (const {canvasName, dataUrl, sourceTextId, sourceText, sourceTextEdited} of canvases) {
            const base64Data = Buffer.from(dataUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');

            let orderedCanvasName;
            switch (canvasName) {
                case 'hook':
                    orderedCanvasName = `01-${canvasName}`
                    break;
                case 'claim':
                    orderedCanvasName = `02-${canvasName}`
                    break;
                case 'review':
                    orderedCanvasName = `03-${canvasName}`
                    break;
                case 'close':
                    orderedCanvasName = `04-${canvasName}`
                    break;
                default:
                    orderedCanvasName = canvasName;
            }

            const key = `${folderName}/${adNameDateTime}/${orderedCanvasName}.png`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
                Body: base64Data,
                ContentType: 'image/png'
            };

            try {
                const result = await s3.send(new PutObjectCommand(params));

                const card = new this.cardModel({
                    userId,
                    accountId: account._id,
                    cardName: canvasName,
                    sourceTextId,
                    sourceText,
                    sourceTextEdited,
                    cardLocation: `${process.env.CF_DOMAIN}/${key}`,
                    backgroundImageLocation,
                    maskLocations,
                    themeId,
                    primaryColor: [account.primaryColor[0], account.primaryColor[1], account.primaryColor[2]],
                    secondaryColor: [account.secondaryColor[0], account.secondaryColor[1], account.secondaryColor[2]],
                });

                const savedCard = await card.save();
                cardIds[canvasName] = savedCard._id;
                cardLocations[canvasName] = savedCard.cardLocation;

                results.push({
                    s3Result: result,
                    card: savedCard
                });

            } catch (error) {
                console.error('Error uploading to S3 or saving card:', error);
                throw error;
            }
        }

        const freshCopy = await this.copyModel.findById(copy._id);

        const ad = await this.adService.createAd(
            adNameDateTime,
            userId,
            account._id.toString(),
            cardIds['hook'],
            cardLocations['hook'],
            cardIds['claim'],
            cardLocations['claim'],
            cardIds['review'],
            cardLocations['review'],
            cardIds['close'],
            cardLocations['close'],
            freshCopy.copyText,
            freshCopy?.copyTextEdited ? freshCopy?.copyTextEdited : '',
            review.bestFitAudience,
            review.bestFitReasoning,
            review.source,
            review.reviewDate,
            // canvasAppStages,
            xRanges,
            yRanges,
            lineHeightMultipliers,
        );

        results.push({ad});

        return results;
    }
}
