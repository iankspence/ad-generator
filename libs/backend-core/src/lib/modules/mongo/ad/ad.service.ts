import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad, AdDocument } from '@monorepo/type';

@Injectable()
export class AdService {
    constructor(@InjectModel(Ad.name) private adModel: Model<AdDocument>) {}
    async createAd(userId: string, accountId: string, hookCardId: string, hookCardLocation: string,  claimCardId: string, claimCardLocation: string, reviewCardId: string, reviewCardLocation: string, closeCardId: string, closeCardLocation: string, copyText: string, copyTextEdited: string, bestFitAudience: number, bestFitReasoning: string): Promise<Ad> {

        const newAd = new this.adModel({ userId, accountId, hookCardId, hookCardLocation, claimCardId, claimCardLocation, reviewCardId, reviewCardLocation, closeCardId, closeCardLocation, copyText,  copyTextEdited, bestFitAudience, bestFitReasoning });
        return newAd.save();
    }
}
