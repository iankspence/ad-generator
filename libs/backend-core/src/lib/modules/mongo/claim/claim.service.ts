import {Claim, ClaimDocument, Hook, HookDocument} from '@monorepo/type';
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

    async updateTextEdit(claim: Partial<ClaimDocument>): Promise<Claim> {
        return this.claimModel.findOneAndUpdate({ _id: claim._id }, { claimTextEdited: claim.claimText }, { new: true });
    }
}
