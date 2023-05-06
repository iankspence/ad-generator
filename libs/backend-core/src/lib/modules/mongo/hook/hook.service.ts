import {Copy, CopyDocument, Hook, HookDocument} from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HookService {
    constructor(@InjectModel(Hook.name) private readonly hookModel: Model<HookDocument>) {}

    async createHook(hook: Partial<Hook>): Promise<Hook> {
        const createdHook = new this.hookModel(hook);
        return await createdHook.save();
    }

    async getHooksByReviewId(reviewId: string): Promise<HookDocument[]> {
        return this.hookModel.find({ reviewId: reviewId }).exec();
    }

    async getHooksByAccountId(accountId: string): Promise<HookDocument[]> {
        return this.hookModel.find({ accountId: accountId }).exec();
    }

    async updateTextEdit(hook: Partial<HookDocument>): Promise<HookDocument> {
        return this.hookModel.findOneAndUpdate({ _id: hook._id }, { hookTextEdited: hook.hookTextEdited }, { new: true });
    }
}
