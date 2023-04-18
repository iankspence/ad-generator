import { Hook, HookDocument } from '@monorepo/type';
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

    async getHooksByReviewId(reviewId: string): Promise<Hook[]> {
        return this.hookModel.find({ reviewId: reviewId }).exec();
    }
}
