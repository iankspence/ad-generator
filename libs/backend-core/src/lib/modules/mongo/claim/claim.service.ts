import {Claim, ClaimDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClaimService {
    constructor(@InjectModel(Claim.name) private readonly claimModel: Model<ClaimDocument>) {}

    async findClaimsByAccountId(accountId: string): Promise<ClaimDocument[]> {
        return this.claimModel.find({ accountId: accountId }).exec();
    }

    async updateTextEdit(claim: Partial<ClaimDocument>): Promise<Claim> {
        return this.claimModel.findOneAndUpdate({ _id: claim._id }, { claimTextEdited: claim.claimTextEdited }, { new: true });
    }
}
