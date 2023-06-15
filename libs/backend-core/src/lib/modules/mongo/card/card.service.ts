import { Injectable, NotFoundException } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Card, CardDocument, CopyDocument, Copy, Ad, SaveCanvasesToS3Dto} from "@monorepo/type";
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

    async saveCanvases(saveCanvasesToS3Dto: SaveCanvasesToS3Dto) {
        const {
            canvases,
            userId,
            account,
            review,
            copy,
            themeId,
            backgroundImageLocation,
            maskLocations,
            userControlledAttributes,
            xRanges,
            yRanges,
            lineHeightMultipliers,
            filteredTextPositions,
            editAd,
        } = saveCanvasesToS3Dto;

        const folderName = `ads/${account.country}/${account.provinceState}/${account.city}/${account.companyName}`
        const results = [];

        const cardIds = [];
        const cardLocations = [];

        const timeZone = 'America/Edmonton'
        const adNameDateTime = createNameDateTime(timeZone)
        let newAdNameDateTime;
        if (editAd) {
            newAdNameDateTime = `${editAd.adNameDateTime.split('____')[0]}____${adNameDateTime}`;
        }

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

            const newKey = editAd ? `${folderName}/${newAdNameDateTime}/${orderedCanvasName}.png` : `${folderName}/${adNameDateTime}/${orderedCanvasName}.png`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: newKey, // save the new cards with the new path
                Body: base64Data,
                ContentType: 'image/png'
            };

            try {
                const result = await s3.send(new PutObjectCommand(params));

                let savedCard;
                if (editAd) {

                    savedCard = await this.cardModel.findOneAndUpdate(
                        {
                            _id: editAd.cardIds.find(card => card.canvasName === canvasName).cardId,
                            userId,
                            accountId: account._id,
                            cardName: canvasName
                        },
                        {
                            cardLocation: newKey,
                            sourceTextId,
                            sourceText,
                            sourceTextEdited,
                            backgroundImageLocation,
                            maskLocations,
                            themeId,
                            primaryColor: account?.primaryColor,
                            secondaryColor: account?.secondaryColor
                        },
                        { new: true }
                    );

                    if (!savedCard) {
                        throw new NotFoundException('Card not found');
                    }
                    if (savedCard) {
                        const oldCardLocation = editAd.cardLocations.find(card => card.canvasName === canvasName).cardLocation;
                        const deleteParams = {
                            Bucket: process.env.S3_BUCKET_NAME,
                            Key: oldCardLocation
                        };
                        try {
                            await s3.send(new DeleteObjectCommand(deleteParams));
                        } catch (error) {
                            console.error('Error deleting old card:', error);
                            throw error;
                        }
                    }
                } else {
                    // If not editing, create new card
                    const card = new this.cardModel({
                        userId,
                        accountId: account._id,
                        cardName: canvasName,
                        sourceTextId,
                        sourceText,
                        sourceTextEdited,
                        cardLocation: newKey,
                        backgroundImageLocation,
                        maskLocations,
                        themeId,
                        primaryColor: account?.primaryColor,
                        secondaryColor: account?.secondaryColor
                    });

                    savedCard = await card.save();
                }

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

            const updatedAd = await this.adService.updateAd(
                editAd,
                editAd.adNameDateTime,
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

    async findCardsByAccountId(accountId: string) {
        return this.cardModel.find({ accountId });
    }

    async findCardsById(cardId: string) {
        return this.cardModel.findById(cardId);
    }

    async copyCardsAndAd(adId: string): Promise<Ad> {
        const adToCopy = await this.adService.findById(adId);
        const newCardIds = [];
        const newCardLocations = [];

        const originalAdDateTime = adToCopy.adNameDateTime;
        const currentDateTime = createNameDateTime('America/Edmonton');
        const newAdNameDateTime = `${originalAdDateTime.split('____')[0]}____${currentDateTime}`;

        for (let i = 0; i < adToCopy.cardIds.length; i++) {
            const oldCard = await this.cardModel.findById(adToCopy.cardIds[i].cardId);
            oldCard._id = new Types.ObjectId();
            oldCard.isNew = true;

            const oldCardParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: oldCard.cardLocation
            };

            const oldCardData = await s3.send(new GetObjectCommand(oldCardParams));
            const bodyData = [];  // Declare bodyData here

            if (oldCardData.Body instanceof Readable) {
                for await (const chunk of oldCardData.Body) {
                    bodyData.push(chunk);
                }
            }

            const oldKeyParts = oldCardParams.Key.split('/');
            oldKeyParts[oldKeyParts.length - 2] = newAdNameDateTime;
            const newKey = oldKeyParts.join('/');

            const newCardParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: newKey,
                Body: Buffer.concat(bodyData),  // now the Body parameter is a Buffer
                ContentType: 'image/png'
            };

            await s3.send(new PutObjectCommand(newCardParams));

            oldCard.cardLocation = newKey
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

        const newAd = await this.adService.createAd(
            newAdNameDateTime,
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
            const cardKey = cardToDelete.cardLocation

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
