import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument, Ad, AdDocument, Card, CardDocument} from '@monorepo/type';
import geoTz from 'geo-tz';
import { CityService } from '../city/city.service';
import { DateTime } from 'luxon';
import { CardService } from '../card/card.service';

@Injectable()
export class AdService {
    constructor(
        @InjectModel(Ad.name) private adModel: Model<AdDocument>,
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
        @InjectModel(Card.name) private cardModel: Model<CardDocument>,
        private readonly cityService: CityService,
) {}

    async createAd(adNameDateTime: string, userId: string, accountId: string, cardIds: Ad["cardIds"], cardLocations: Ad["cardLocations"], copyText: string, copyTextEdited: string, bestFitAudience: number, bestFitReasoning: string, source: string, reviewDate: string, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions: Ad["filteredTextPositions"], themeId: Ad["themeId"]): Promise<Ad> {
        const newAd = new this.adModel({ adNameDateTime, userId, accountId, cardIds, cardLocations, copyText,  copyTextEdited, bestFitAudience, bestFitReasoning, source, reviewDate, adStatus: 'fresh', userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions, themeId});

        return newAd.save();
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

    async findAdsByAccountId(accountId: string) {
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

    async deleteAd(adId: string): Promise<void> {
        const ad = await this.adModel.findById(adId);
        if (!ad) {
            throw new NotFoundException('Ad not found');
        }
        await this.adModel.deleteOne({ _id: adId });
    }

    async updateAdStatus(adId: string, accountId: string, newStatus: "fresh" | "pdf" | "review" | "approved" | "delivered") {
        const ad = await this.adModel.findById(adId);
        if (!ad) throw new Error('No Ad found with provided ID');

        if (newStatus === 'delivered') {
            const account = await this.accountModel.findById(accountId);
            if (!account) throw new Error('No Account found with provided ID');
            ad.deliveryDate = DateTime.now().setZone(account.timezone).toLocaleString(DateTime.DATETIME_FULL);
        }

        ad.adStatus = newStatus;
        return ad.save();
    }

    async deliverAdsIfPossible(accountId: string, numAds: number) {
        const ads = await this.findAdsByAccountId(accountId);
        const approvedAds = ads.filter(ad => ad.adStatus === 'approved');

        if (approvedAds.length < numAds) return false;

        for (let i = 0; i < numAds; i++) {
            await this.updateAdStatus(approvedAds[i]._id.toString(), accountId, 'delivered');
        }

        return true;
    }

    async findHookTextByAdId(adId: string): Promise<string | null> {
        const ad = await this.adModel.findById(adId);
        if (!ad) return null;

        const hookCardRelation = ad.cardIds.find(relation => relation.canvasName === 'hook');
        if (!hookCardRelation) return null;

        const card = await this.cardModel.findById(hookCardRelation.cardId);
        if (!card) return null;

        return card.sourceTextEdited || card.sourceText;
    }
}
