import { Account, AccountDocument, Review, ReviewDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel, Prop } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

    async getReviewsByAccountId(accountId: string): Promise<Review[]> {
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
}
