import {Account, AccountDocument, Hook, HookDocument, Review, ReviewDocument} from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel, Prop } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

    async getReviewsByAccountId(accountId: string): Promise<ReviewDocument[]> {
        return this.reviewModel.find({ accountId: accountId }).exec();
    }

    async updateReviewAudience(
        userId: string,
        reviewId: string,
        bestFitAudience: number,
        bestFitReasoning: string,
    ): Promise<ReviewDocument> {
        const unchangedReview = await this.reviewModel.findOne({ _id: reviewId });

        return await this.reviewModel
            .findOneAndUpdate(
                { _id: reviewId },
                {
                    audienceChanges: [
                        ...unchangedReview.audienceChanges.concat({
                            dateOfChange: new Date().toDateString(),
                            userId,
                            bestFitAudienceBefore: unchangedReview.bestFitAudience,
                            bestFitAudienceAfter: bestFitAudience,
                            bestFitReasoningBefore: unchangedReview.bestFitReasoning,
                            bestFitReasoningAfter: bestFitReasoning,
                        }),
                    ],
                    bestFitAudience,
                    bestFitReasoning,
                },
                { new: true },
            )
            .exec();
    }

    async createReview(review: Partial<Review>): Promise<Review> {
        return await this.reviewModel.create(review);
    }

    async updateTextEdit(review: Partial<ReviewDocument>): Promise<Review> {
        return this.reviewModel.findOneAndUpdate({ _id: review._id }, {
            reviewTextEdited: review.reviewTextEdited
        }, { new: true });
    }
}
