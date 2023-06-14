import { AdSet, AdSetDocument, CreateAdSetForPdfDeliveryDto } from '@monorepo/type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PdfQueueProducerService } from '../../bull/pdf-queue/producer/pdf-queue-producer.service';
import { AdService } from '../ad/ad.service';
import { createNameDateTime } from '../../../utils/createNameDateTime';
import { CardService } from '../card/card.service';
import { join } from 'path';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.S3_REGION
});

@Injectable()
export class AdSetService {
    constructor(
        @InjectModel(AdSet.name) private adSetModel: Model<AdSetDocument>,
        private adService: AdService,
        private pdfQueueProducerService: PdfQueueProducerService,
        private cardService: CardService,
    ) {}
    async findById(adSetId: string): Promise<AdSet> {
        return this.adSetModel.findById({ _id: adSetId }).exec();
    }

    async findAdSetsByAccountId(accountId: string): Promise<AdSetDocument[]> {
        return this.adSetModel.find({ accountId }).exec();
    }

    async createAdSetForPdfDelivery(adSetData: CreateAdSetForPdfDeliveryDto): Promise<AdSet> {

        const nameDateTime = createNameDateTime('America/Edmonton')
        const createdAdSet = new this.adSetModel({ ...adSetData, nameDateTime });

        for (const adId of adSetData.adIds) {
            const updatedAd = await this.adService.findById(adId);
            updatedAd.adStatus = 'pdf';
            updatedAd.adSetId = createdAdSet._id.toString();
            updatedAd.adSetNameDateTime = nameDateTime;
            await updatedAd.save();
        }

        await this.pdfQueueProducerService.addCreatePdfJob({
            adSet: createdAdSet,
            accountId: adSetData.accountId,
        });

        return createdAdSet.save();
    }

    async deleteAdsetAndAdsAndCards(adSetId: string): Promise<void> {
        const adSet = await this.findById(adSetId);
        if (!adSet) {
            throw new NotFoundException('Ad Set not found');
        }

        for (const adId of adSet.adIds) {
            await this.cardService.deleteCardsAndAd(adId);
        }

        await this.adSetModel.deleteOne({ _id: adSetId });
    }

    async findPdfLocationByAdSetId(adsetId: string): Promise<string> {
        const adSet = await this.findById(adsetId);
        if (!adSet) {
            throw new NotFoundException('Ad Set not found');
        }

        return join(process.env.CF_DOMAIN, adSet.pdfLocation);
    }
}
