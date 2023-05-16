import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {AccountDocument, Card, CardDocument} from "@monorepo/type";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

const s3 = new S3Client({
    region: process.env.S3_REGION
});

@Injectable()
export class CardService {
    constructor(@InjectModel(Card.name) private readonly cardModel: Model<CardDocument>) {}

    async saveCanvases(canvases: Array<{canvasName: string, dataUrl: string, sourceTextId: string, sourceText: string, sourceTextEdited: string}>, userId: string, account: AccountDocument, themeId: string, backgroundImageLocation: string, maskLocations: {maskLocation: string, maskName: string}[]) {
        const folderName = `ads/${account.country}/${account.provinceState}/${account.city}/${account.companyName}`
        const results = [];

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

            const key = `${folderName}/${orderedCanvasName}.png`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
                Body: base64Data,
                ContentType: 'image/png'
            };

            try {
                const result = await s3.send(new PutObjectCommand(params));

                console.log('userId', userId)
                console.log('account._id', account._id)
                console.log('canvasName', canvasName)
                console.log('sourceTextId', sourceTextId)
                console.log('sourceText', sourceText)
                console.log('sourceTextEdited', sourceTextEdited)
                console.log('key', key)
                console.log('backgroundImageLocation', backgroundImageLocation)
                console.log('maskLocations', maskLocations)
                console.log('themeId', themeId)
                console.log('account.primaryColor', account.primaryColor)
                console.log('account.secondaryColor', account.secondaryColor)

                // Create new card document
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

                results.push({
                    s3Result: result,
                    card: savedCard
                });

            } catch (error) {
                console.error('Error uploading to S3 or saving card:', error);
                throw error;
            }
        }

        return results;
    }
}
