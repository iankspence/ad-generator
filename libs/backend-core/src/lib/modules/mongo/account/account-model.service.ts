import { ClaimService } from '../claim/claim.service';
import { CloseService } from '../close/close.service';
import { CopyService } from '../copy/copy.service';
import { HookService } from '../hook/hook.service';
import { ReviewService } from '../review/review.service';
import {
    Account,
    AccountDocument,
    ClaimDocument,
    CloseDocument,
    CopyDocument, CreateAccountDto, FindAccountByUserIdDto, FindAccountsByManagerIdDto,
    FindTextByAccountIdDto,
    HookDocument,
    ReviewDocument, UpdateAccountLogoAndColorsDto, UpdateAccountManagerDto,
} from '@monorepo/type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Buffer } from 'buffer';
import { Model, Types } from 'mongoose';
import { AdSetService } from '../ad-set/ad-set.service';
import { AdService } from '../ad/ad.service';
import { CardService } from '../card/card.service';
import geoTz from 'geo-tz';
import { CityService } from '../city/city.service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.S3_REGION,
});

@Injectable()
export class AccountModelService {
    constructor(
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
        private readonly copyService: CopyService,
        private readonly claimService: ClaimService,
        private readonly hookService: HookService,
        private readonly reviewService: ReviewService,
        private readonly closeService: CloseService,
        private readonly adSetService: AdSetService,
        private readonly adService: AdService,
        private readonly cardService: CardService,
        private readonly cityService: CityService,
    ) {}

    async create(createAccountDto: CreateAccountDto): Promise<AccountDocument> {

        const { lat, lon } = await this.cityService.findLatLonByCityAndProvinceState(createAccountDto.city, createAccountDto.provinceState);
        const timezone = geoTz.find(lat, lon)[0];

        const createdAccount = new this.accountModel({ ...createAccountDto, timezone, isActive: true });
        return createdAccount.save();
    }

    async delete(accountId: string): Promise<Account> {
        const deletedAccount = await this.accountModel.findByIdAndDelete(accountId);
        if (!deletedAccount) {
            throw new NotFoundException(`Account with accountId ${accountId} not found`);
        }

        const accountAdSets = await this.adSetService.findAdSetsByAccountId(accountId);
        for (const adSet of accountAdSets) {
            await this.adSetService.deleteAdsetAndAdsAndCards(adSet._id.toString());
        }

        // delete the remaining ads which did not belong to any adset
        const ads = await this.adService.findAdsByAccountId(accountId);
        for (const ad of ads) {
            await this.cardService.deleteCardsAndAd(ad._id.toString());
        }

        return deletedAccount;
    }

    async findOneById(_id: string): Promise<AccountDocument> {
        return await this.accountModel.findOne({ _id: _id }).exec();
    }

    async updateAccountLogoAndColors(updateAccountLogoAndColorsDto: UpdateAccountLogoAndColorsDto): Promise<Account | null> {
        const account = await this.accountModel.findOne({ _id: updateAccountLogoAndColorsDto.accountId }).exec();

        if (account) {
            const base64Data = updateAccountLogoAndColorsDto.logo.replace(/^data:image\/\w+;base64,/, '');
            const dataBuffer = Buffer.from(base64Data, 'base64');
            const contentType = 'image/png';
            const folderName = `logo/${account.country}/${account.provinceState}/${account.city}/${account.companyName}`;
            const fileName = `${Date.now()}.png`;

            const upload = new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `${folderName}/${fileName}`,
                Body: dataBuffer,
                ContentType: contentType
            });
            try {
                await s3.send(upload);
            } catch (error) {
                console.error('Error uploading to S3:', error);
                throw error;
            }

            // Update the logo field with the S3 path (without Cloudfront distribution)
            updateAccountLogoAndColorsDto.logo = `${folderName}/${fileName}`;

            return this.accountModel.findOneAndUpdate({ _id: updateAccountLogoAndColorsDto.accountId }, updateAccountLogoAndColorsDto, { new: true }).exec();
        }

        throw new NotFoundException(`Account with accountId ${updateAccountLogoAndColorsDto.accountId} not found`);
    }

    async getAccounts(): Promise<AccountDocument[]> {
        return this.accountModel.find().exec();
    }

    async findAccountByUserId(findAccountByUserIdDto: FindAccountByUserIdDto): Promise<AccountDocument> {
        return this.accountModel.findOne({ userId: findAccountByUserIdDto.userId }).exec();
    }

    async addGoogleQuery(accountId: string, googleQuery: string | string[]) {
        return this.accountModel.findOneAndUpdate({ _id: accountId }, { googleQuery }, { new: true }).exec();
    }

    async addRateMdsLink(accountId: string, rateMdsLink: string) {
        const account = await this.accountModel.findOne({ _id: new Types.ObjectId(accountId) }).exec();
        return this.accountModel
            .findOneAndUpdate(
                { _id: new Types.ObjectId(accountId) },
                { rateMdsLinks: account.rateMdsLinks.concat(rateMdsLink) },
                { new: true },
            )
            .exec();
    }

    async addRateMDsHeader(accountId: string, originUrl: string, capturedText: any) {
        const account = await this.accountModel.findOne({ _id: new Types.ObjectId(accountId) }).exec();

        const rateMdsHeader = {
            name: capturedText['Name'],
            typeOfDoctor: capturedText['Type of Doctor'],
            numberOfReviews: parseInt(capturedText['Number of Reviews']),
            currentRanking: parseInt(capturedText['Current Ranking']),
            rankingMax: parseInt(capturedText['Ranking Max']),
            rankingCategory: capturedText['Ranking Category'],
            rankingCategoryLink: capturedText['Ranking Category Link'],
            profileImage: capturedText['Profile Image'],
            accountName: capturedText['Account Name'],
            accountLink: capturedText['Account Link'],
            websiteLink: capturedText['Website Link'],
            provinceState: capturedText['Province State'],
            city: capturedText['City'],
        };

        const encodedOriginUrl = Buffer.from(originUrl).toString('base64');

        if (encodedOriginUrl in account.rateMdsHeaders) {
            // if there's already a header for this originUrl, check if the number of reviews has changed
            if (account.rateMdsHeaders[encodedOriginUrl].numberOfReviews !== rateMdsHeader.numberOfReviews) {
                await this.accountModel
                    .findOneAndUpdate(
                        { _id: accountId },
                        {
                            $set: {
                                [`rateMdsHeaders.${encodedOriginUrl}.numberOfReviews`]: rateMdsHeader.numberOfReviews,
                            },
                        },
                    )
                    .exec();

                return rateMdsHeader.numberOfReviews; // return the new number of reviews
            }
        }

        await this.accountModel
            .findOneAndUpdate(
                { _id: accountId },
                {
                    $set: {
                        [`rateMdsHeaders.${encodedOriginUrl}`]: rateMdsHeader,
                    },
                },
                { new: true },
            )
            .exec();

        return rateMdsHeader.numberOfReviews;
    }

    async findTextByAccountId(findTextByAccountIdDto: FindTextByAccountIdDto): Promise<[ReviewDocument[], HookDocument[], ClaimDocument[], CloseDocument[], CopyDocument[]]> {
        const reviews = await this.reviewService.findReviewsByAccountId(findTextByAccountIdDto.accountId);
        const hooks = await this.hookService.findHooksByAccountId(findTextByAccountIdDto.accountId);
        const claims = await this.claimService.findClaimsByAccountId(findTextByAccountIdDto.accountId);
        const closes = await this.closeService.findClosesByAccountId(findTextByAccountIdDto.accountId);
        const copies = await this.copyService.findCopiesByAccountId(findTextByAccountIdDto.accountId);

        return [reviews, hooks, claims, closes, copies];
    }

    async updateAccountManager(updateAccountManagerDto: UpdateAccountManagerDto): Promise<Account | null> {
        return this.accountModel.findOneAndUpdate({ _id: updateAccountManagerDto.accountId }, {
            managerUserId: updateAccountManagerDto.managerUserId,
        }, { new: true }).exec();
    }

    async findUnassignedAccounts(): Promise<AccountDocument[]> {
        return this.accountModel.find({ managerUserId: null }).exec();
    }

    async findAccountsByManagerId(findAccountsByManagerIdDto: FindAccountsByManagerIdDto): Promise<AccountDocument[]> {
        return this.accountModel.find({ managerUserId: findAccountsByManagerIdDto.managerUserId }).exec();
    }

    async deactivateAccount(accountId: string): Promise<Account | null> {
        return this.accountModel.findOneAndUpdate({ _id: accountId }, {
            isActive: false,
        }, { new: true }).exec();
    }

    async reactivateAccount(accountId: string): Promise<Account | null> {
        return this.accountModel.findOneAndUpdate({ _id: accountId }, {
            isActive: true,
        }, { new: true }).exec();
    }

    async updateAdsPaidWithoutDelivery(accountId: string, adsPaidWithoutDelivery: number): Promise<Account | null> {
        return this.accountModel.findOneAndUpdate({ _id: accountId }, {
            adsPaidWithoutDelivery,
        }, { new: true }).exec();
    }

    async updateSetupPaymentComplete(accountId: string): Promise<Account | null> {
        return this.accountModel.findOneAndUpdate({ _id: accountId }, {
            setupPaymentComplete: true,
        }, { new: true }).exec();
    }
}
