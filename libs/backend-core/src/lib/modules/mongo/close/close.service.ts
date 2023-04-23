import { Close, CloseDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CloseService {
    constructor(@InjectModel(Close.name) private readonly closeModel: Model<CloseDocument>) {}

    async createClose(close: Partial<Close>): Promise<Close> {
        const createdClose = new this.closeModel(close);
        return await createdClose.save();
    }

    async getClosesByReviewId(reviewId: string): Promise<Close[]> {
        return this.closeModel.find({ reviewId: reviewId }).exec();
    }
}
