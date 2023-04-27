import { Claim, ClaimDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClaimService {
    constructor(@InjectModel(Claim.name) private readonly claimModel: Model<ClaimDocument>) {}

    async createClaim(claim: Partial<Claim>): Promise<Claim> {
        const createdClaim = new this.claimModel(claim);
        return await createdClaim.save();
    }

    async getClaimsByReviewId(reviewId: string): Promise<Claim[]> {
        return this.claimModel.find({ reviewId: reviewId }).exec();
    }

    async getClaimsByAccountId(accountId: string): Promise<ClaimDocument[]> {
        return this.claimModel.find({ accountId: accountId }).exec();
    }
}
