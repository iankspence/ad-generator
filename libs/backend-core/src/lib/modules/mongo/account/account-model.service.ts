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
    CopyDocument,
    HookDocument,
    ReviewDocument,
} from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Buffer } from 'buffer';
import { Model, Types } from 'mongoose';

@Injectable()
export class AccountModelService {
    constructor(
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
        private readonly copyService: CopyService,
        private readonly claimService: ClaimService,
        private readonly hookService: HookService,
        private readonly reviewService: ReviewService,
        private readonly closeService: CloseService,
    ) {}

    async getAllTextByAccountId(
        accountId: string,
    ): Promise<[ReviewDocument[], HookDocument[], ClaimDocument[], CloseDocument[], CopyDocument[]]> {
        console.log('accountId', accountId);
        const reviews = await this.reviewService.getReviewsByAccountId(accountId);
        console.log('reviews', reviews);
        const hooks = await this.hookService.getHooksByAccountId(accountId);
        console.log('hooks', hooks);
        const claims = await this.claimService.getClaimsByAccountId(accountId);
        console.log('claims', claims);
        const closes = await this.closeService.getClosesByAccountId(accountId);
        console.log('closes', closes);
        const copies = await this.copyService.getCopiesByAccountId(accountId);
        console.log('copies', copies);

        return [reviews, hooks, claims, closes, copies];
    }

    async create(account: Partial<Account>): Promise<Account> {
        const createdAccount = new this.accountModel(account);
        return createdAccount.save();
    }
    async findOneById(id: string): Promise<Account> {
        return await this.accountModel.findOne({ id: id }).exec();
    }

    async updateOneById(_id: string, update: Partial<Account>): Promise<Account | null> {
        console.log('updateOneById (service)', _id, update);
        return this.accountModel.findOneAndUpdate({ _id: _id }, update, { new: true }).exec();
    }

    async deleteOneById(_id: string): Promise<Account | null> {
        return this.accountModel.findOneAndDelete({ _id }).exec();
    }

    async findAccountByUserId(userId: string): Promise<Account> {
        console.log('findAccountByUserId', userId);
        return this.accountModel.findOne({ userId: new Types.ObjectId(userId) }).exec();
    }

    async addGoogleQuery(accountId: string, googleQuery: string) {
        return this.accountModel.findOneAndUpdate({ _id: accountId }, { googleQuery }, { new: true }).exec();
    }

    async addFacebookLink(accountId: string, facebookLink: string) {
        return this.accountModel
            .findOneAndUpdate({ _id: new Types.ObjectId(accountId) }, { facebookLink }, { new: true })
            .exec();
    }

    async addRateMdsLink(accountId: string, rateMdsLink: string) {
        const account = await this.accountModel.findOne({ _id: new Types.ObjectId(accountId) }).exec();
        console.log('account model service ---', account);
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

        console.log('account', account);
        console.log('originUrl', originUrl);
        console.log('capturedText', capturedText);

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

        // if there's no header for this originUrl, add it
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
}
