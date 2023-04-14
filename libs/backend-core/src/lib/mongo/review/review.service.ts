import { Account, AccountDocument, Review, ReviewDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

    async getReviewsByAccountId(accountId: string): Promise<Review[]> {
        return this.reviewModel.find({ accountId: accountId }).exec();
    }
}
