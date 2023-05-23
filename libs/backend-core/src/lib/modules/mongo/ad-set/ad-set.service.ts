import { AdSet, AdSetDocument, AdDocument, Ad, CreateAdSetForPdfDeliveryDto } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdSetService {
    constructor(
        @InjectModel(AdSet.name) private adSetModel: Model<AdSetDocument>,
        @InjectModel(Ad.name) private adModel: Model<AdDocument>,
    ) {}

    async createAdSetForPdfDelivery(adSetData: CreateAdSetForPdfDeliveryDto): Promise<AdSet> {
        const createdAdSet = new this.adSetModel(adSetData);

        // Update adStatus and deliveryType for each ad in adIds
        for (const adId of adSetData.adIds) {
            await this.adModel.updateOne({ _id: adId }, { adStatus: 'queue', deliveryType: 'pdf', adSetId: createdAdSet._id });
        }

        return createdAdSet.save();
}
}
