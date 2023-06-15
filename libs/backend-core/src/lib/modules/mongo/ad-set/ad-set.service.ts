import {
    Account,
    AccountDocument,
    AdSet,
    AdSetDocument,
    CreateAdSetForPdfDeliveryDto,
    UpdateAdStatusByAdSetIdDto,
} from '@monorepo/type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PdfQueueProducerService } from '../../bull/pdf-queue/producer/pdf-queue-producer.service';
import { AdService } from '../ad/ad.service';
import { createNameDateTime } from '../../../utils/createNameDateTime';
import { CardService } from '../card/card.service';
import { join } from 'path';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class AdSetService {
    constructor(
        @InjectModel(AdSet.name) private adSetModel: Model<AdSetDocument>,
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
        private adService: AdService,
        private pdfQueueProducerService: PdfQueueProducerService,
        private cardService: CardService,
        private logger: LoggerService
    ) {
        this.logger.setContext('AdSetService');
    }
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

    async updateAdStatusByAdSetId(updateAdStatusByAdSetIdDto: UpdateAdStatusByAdSetIdDto): Promise<void> {

        const adSet = await this.findById(updateAdStatusByAdSetIdDto.adSetId);
        if (!adSet) {
            this.logger.error(`Ad Set not found: ${updateAdStatusByAdSetIdDto.adSetId}`)
            return null;
        }

        const account = await this.accountModel.findById(adSet.accountId);
        if (!account) {
            this.logger.error(`Account not found: ${adSet.accountId}`)
            return null;
        }

        for (const adId of adSet.adIds) {
            const ad = await this.adService.findById(adId);
            ad.adStatus = updateAdStatusByAdSetIdDto.adStatus;
            await ad.save();
            this.logger.log(`Ad.adStatus updated for ad: ${adId} to ${updateAdStatusByAdSetIdDto.adStatus}`)
        }

        if (updateAdStatusByAdSetIdDto.adStatus === 'approved' && account.adsPaidWithoutDelivery) {
            this.logger.verbose(`Ad.adStatus is being set to 'approved' - checking to see if adsPaidWithoutDelivery is greater than 0`)
            const allAds = await this.adService.findAdsByAccountId(adSet.accountId);

            const approvedAdsNotInSet = allAds.filter(ad => ad.adStatus === 'approved' && !adSet.adIds.includes(ad._id.toString()));
            const approvedAdsInSet = allAds.filter(ad => ad.adStatus === 'approved' && adSet.adIds.includes(ad._id.toString()));

            const totalApprovedAds = approvedAdsNotInSet.length + approvedAdsInSet.length;

            this.logger.log(`totalApprovedAds: ${totalApprovedAds} - account.adsPaidWithoutDelivery: ${account.adsPaidWithoutDelivery}`)

            if (totalApprovedAds >= account.adsPaidWithoutDelivery) {
                this.logger.log(`totalApprovedAds is greater than or equal to account.adsPaidWithoutDelivery - updating adsPaidWithoutDelivery and setting adStatus to 'delivered' for ${account.adsPaidWithoutDelivery} ads`)
                let deliveredCount = 0;

                for (const approvedAd of approvedAdsNotInSet) {
                    if (deliveredCount >= account.adsPaidWithoutDelivery) {
                        break;
                    }
                    this.logger.log(`Delivering pre-existing 'approved' ads (not in the new ad set): ${approvedAd._id.toString()}`)
                    approvedAd.adStatus = 'delivered';
                    await approvedAd.save();
                    deliveredCount++;
                }

                if (deliveredCount < account.adsPaidWithoutDelivery) {

                    for (const approvedAd of approvedAdsInSet) {

                        this.logger.log(`Delivering newly 'approved' ads (in the new ad set): ${approvedAd._id.toString()}`)
                        if (deliveredCount >= account.adsPaidWithoutDelivery) {
                            break;
                        }
                        approvedAd.adStatus = 'delivered';
                        await approvedAd.save();
                        deliveredCount++;
                    }
                }

                this.logger.log(`Resetting account.adsPaidWithoutDelivery to null for accountId: ${account._id.toString()}`)
                account.adsPaidWithoutDelivery -= deliveredCount;
                if(account.adsPaidWithoutDelivery <= 0) {
                    account.adsPaidWithoutDelivery = null;
                }
                await account.save();
            }
        }

    }
}
