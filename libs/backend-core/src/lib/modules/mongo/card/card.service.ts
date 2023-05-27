import { Injectable, NotFoundException } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import {AccountDocument, Card, CardDocument, ReviewDocument, CopyDocument, Copy, Ad} from "@monorepo/type";
import {InjectModel} from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import {AdService} from "../ad/ad.service";
import { createNameDateTime } from '../../../utils/createNameDateTime';
import { Readable } from 'stream';

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

    async saveCanvases(canvases: Array<{canvasName: string, dataUrl: string, sourceTextId: string, sourceText: string, sourceTextEdited: string}>, userId: string, account: AccountDocument, review: ReviewDocument, copy: CopyDocument, themeId: string, backgroundImageLocation: string, maskLocations: {maskLocation: string, maskName: string}[], userControlledAttributes: Ad["userControlledAttributes"], xRanges: Ad["xRanges"], yRanges: Ad["yRanges"], lineHeightMultipliers: Ad["lineHeightMultipliers"], filteredTextPositions: Ad["filteredTextPositions"], editAd) {
        const folderName = `ads/${account.country}/${account.provinceState}/${account.city}/${account.companyName}`
        const results = [];

        const cardIds = [];
        const cardLocations = [];

        const timeZone = 'America/Edmonton'
        const adNameDateTime = createNameDateTime(timeZone)

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

            console.log('canvasName: copy: ', canvasName, copy)

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
                    primaryColor: account?.primaryColor,
                    secondaryColor: account?.secondaryColor
                });

                const savedCard = await card.save();
                cardIds.push({
                    canvasName: savedCard.cardName,
                    cardId: savedCard._id
                });

                cardLocations.push({
                    canvasName: savedCard.cardName,
                    cardLocation: savedCard.cardLocation
                });

                results.push({
                    s3Result: result,
                    card: savedCard
                });

            } catch (error) {
                console.error('Error uploading to S3 or saving card:', error);
                throw error;
            }
        }

        const freshCopy = await this.copyModel.findById(copy._id); // ensures an edited copy is used

        if (editAd) {
            console.log('updating an existing ad:', userControlledAttributes)

            const updatedAd = await this.adService.updateAd(
                editAd,
                adNameDateTime,
                userId,
                account._id.toString(),
                cardIds,
                cardLocations,
                freshCopy.copyText,
                freshCopy?.copyTextEdited ? freshCopy?.copyTextEdited : '',
                review.bestFitAudience,
                review.bestFitReasoning,
                review.source,
                review.reviewDate,
                userControlledAttributes,
                xRanges,
                yRanges,
                lineHeightMultipliers,
                filteredTextPositions,
                themeId,
            );

            results.push({ad: updatedAd});

            return results;
        }

        console.log('creating an ad with userControlledAttributes:', userControlledAttributes)

        const ad = await this.adService.createAd(
            adNameDateTime,
            userId,
            account._id.toString(),
            cardIds,
            cardLocations,
            freshCopy.copyText,
            freshCopy?.copyTextEdited ? freshCopy?.copyTextEdited : '',
            review.bestFitAudience,
            review.bestFitReasoning,
            review.source,
            review.reviewDate,
            userControlledAttributes,
            xRanges,
            yRanges,
            lineHeightMultipliers,
            filteredTextPositions,
            themeId,
        );

        results.push({ad});

        return results;
    }

    async getCardsByAccountId(accountId: string) {
        return this.cardModel.find({accountId});
    }

    async copyCardsAndAd(adId: string): Promise<Ad> {
        const adToCopy = await this.adService.findById(adId);
        const newCardIds = [];
        const newCardLocations = [];

        const dateNameTime = createNameDateTime('America/Edmonton');

        // copying the cards
        for (let i = 0; i < adToCopy.cardIds.length; i++) {
            const oldCard = await this.cardModel.findById(adToCopy.cardIds[i].cardId);
            oldCard._id = new Types.ObjectId(); // create a new ObjectId
            oldCard.isNew = true; // this makes mongoose treat the document as new

            console.log(oldCard.cardLocation.replace(`${process.env.CF_DOMAIN}/`, ''))

            const oldCardParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: oldCard.cardLocation.replace(`${process.env.CF_DOMAIN}/`, '')
            };

            const oldCardData = await s3.send(new GetObjectCommand(oldCardParams));

            const bodyData = [];  // Declare bodyData here

            // Check if Body is an instance of Readable (Node.js environment)
            if (oldCardData.Body instanceof Readable) {
                for await (const chunk of oldCardData.Body) {
                    bodyData.push(chunk);
                }
            }

            // Generate a new key (file name) for the copied PNG file
            const oldKeyParts = oldCardParams.Key.split('/');
            oldKeyParts[oldKeyParts.length - 2] = dateNameTime;
            const newKey = oldKeyParts.join('/');

            // Upload the copied PNG file to S3
            const newCardParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: newKey,
                Body: Buffer.concat(bodyData),  // now the Body parameter is a Buffer
                ContentType: 'image/png'
            };

            await s3.send(new PutObjectCommand(newCardParams));

            // Update the cardLocation in the copied card
            oldCard.cardLocation = `${process.env.CF_DOMAIN}/${newKey}`;

            const newCard = await oldCard.save();

            newCardIds.push({
                canvasName: adToCopy.cardIds[i].canvasName,
                cardId: newCard._id
            });
            newCardLocations.push({
                canvasName: adToCopy.cardLocations[i].canvasName,
                cardLocation: newCard.cardLocation
            });
        }

        // now creating the ad with the new cardIds and cardLocations
        const newAd = await this.adService.createAd(
            createNameDateTime('America/Edmonton'),
            adToCopy.userId,
            adToCopy.accountId,
            newCardIds, // new cardIds
            newCardLocations, // new cardLocations
            adToCopy.copyText,
            adToCopy.copyTextEdited,
            adToCopy.bestFitAudience,
            adToCopy.bestFitReasoning,
            adToCopy.source,
            adToCopy.reviewDate,
            adToCopy.userControlledAttributes,
            adToCopy.xRanges,
            adToCopy.yRanges,
            adToCopy.lineHeightMultipliers,
            adToCopy.filteredTextPositions,
            adToCopy.themeId,
        );

        console.log('New ad created in Mongo: ', newAd)
        return newAd;
    }


    async deleteCardsAndAd(adId: string): Promise<void> {
        const ad = await this.adService.findById(adId);
        if (!ad) {
            throw new NotFoundException('Ad not found');
        }

        // deleting the cards related to the ad
        for (const card of ad.cardIds) {
            const cardToDelete = await this.cardModel.findById(card.cardId);
            const cardKey = cardToDelete.cardLocation.replace(`${process.env.CF_DOMAIN}/`, '');

            // List all objects in the card's folder
            const listObjectsResponse = await s3.send(
                new ListObjectsV2Command({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Prefix: cardKey,
                })
            );

            // Delete all objects in the card's folder
            for (const object of listObjectsResponse.Contents) {
                await s3.send(
                    new DeleteObjectCommand({
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: object.Key,
                    })
                );
            }

            // delete card from MongoDB
            await this.cardModel.deleteOne({ _id: card.cardId });
        }

        // deleting the ad
        await this.adService.deleteAd(adId);
    }
}
