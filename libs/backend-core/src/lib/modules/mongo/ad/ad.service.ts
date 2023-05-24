import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ad, AdDocument} from '@monorepo/type';

@Injectable()
export class AdService {
    constructor(@InjectModel(Ad.name) private adModel: Model<AdDocument>) {}

    async createAd(adNameDateTime: string, userId: string, accountId: string, cardIds: Ad["cardIds"], cardLocations: Ad["cardLocations"], copyText: string, copyTextEdited: string, bestFitAudience: number, bestFitReasoning: string, source: string, reviewDate: string, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions: Ad["filteredTextPositions"], themeId: Ad["themeId"]): Promise<Ad> {
        return new this.adModel({ adNameDateTime, userId, accountId, cardIds, cardLocations, copyText,  copyTextEdited, bestFitAudience, bestFitReasoning, source, reviewDate, adStatus: 'fresh', deliveryType: null, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions, themeId});
    }

    async findById(_id: string): Promise<AdDocument> {
        return this.adModel.findById(_id);
    }

    async updateAd(editAd, adNameDateTime, userId, accountId, cardIds, cardLocations, copyText, copyTextEdited, bestFitAudience, bestFitReasoning, source, reviewDate, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions: Ad["filteredTextPositions"], themeId: Ad["themeId"]): Promise<Ad> {
        if (!editAd) return null;

        const updateAd = await this.adModel.findById({ _id: editAd._id })
        if (!updateAd) throw new Error('Ad not found');

        updateAd.cardIds = cardIds;
        updateAd.cardLocations = cardLocations;
        updateAd.copyText = copyText;
        updateAd.copyTextEdited = copyTextEdited;
        updateAd.bestFitAudience = bestFitAudience;
        updateAd.bestFitReasoning = bestFitReasoning;
        updateAd.source = source;
        updateAd.reviewDate = reviewDate;
        updateAd.userControlledAttributes = userControlledAttributes;
        updateAd.xRanges = xRanges;
        updateAd.yRanges = yRanges;
        updateAd.lineHeightMultipliers = lineHeightMultipliers;
        updateAd.filteredTextPositions = filteredTextPositions;
        updateAd.themeId = themeId;

        await updateAd.save();

        return updateAd;
    }

    async getAdsByAccountId(accountId: string) {
        try {
            return this.adModel.find({ accountId }).exec();
        } catch (error) {
            console.error('Error fetching ads:', error);
            throw error;
        }
    }

    async getAdsByAdSetId(dto: { adSetId: string }) {
        try {
            return this.adModel.find({ adSetId: dto.adSetId }).exec();
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

}
