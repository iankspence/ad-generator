import { AdSet, AdSetDocument, CreateAdSetForPdfDeliveryDto } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PdfQueueProducerService } from '../../bull/pdf-queue-producer.service';
import { AdService } from '../ad/ad.service';
import { createNameDateTime } from '../../../utils/createNameDateTime';

@Injectable()
export class AdSetService {
    constructor(
        @InjectModel(AdSet.name) private adSetModel: Model<AdSetDocument>,
        private adService: AdService,
        private pdfQueueProducerService: PdfQueueProducerService
    ) {}

    async findById(adSetId: string): Promise<AdSet> {
        return this.adSetModel.findById({ _id: adSetId }).exec();
    }

    async createAdSetForPdfDelivery(adSetData: CreateAdSetForPdfDeliveryDto): Promise<AdSet> {

        const nameDateTime = createNameDateTime('America/Edmonton')
        const createdAdSet = new this.adSetModel({ ...adSetData, nameDateTime });

        // Update adStatus and deliveryType for each ad in adIds
        for (const adId of adSetData.adIds) {
            const updatedAd = await this.adService.findById(adId);
            updatedAd.adStatus = 'queue';
            updatedAd.deliveryType = 'pdf';
            updatedAd.adSetId = createdAdSet._id.toString();
            updatedAd.adSetNameDateTime = nameDateTime;
            const savedAd = await updatedAd.save();
            console.log('savedAd', savedAd)
        }

        await this.pdfQueueProducerService.addCreatePdfJob(createdAdSet, adSetData.accountId);

        return createdAdSet.save();
    }
}