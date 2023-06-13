import { Review, ReviewDocument, UpdateReviewAudienceDto } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

    async findReviewsByAccountId(accountId: string): Promise<ReviewDocument[]> {
        return this.reviewModel.find({ accountId }).sort({ createdAt: 1 }).exec();
    }

    async updateReviewAudience(updateReviewAudienceDto: UpdateReviewAudienceDto): Promise<ReviewDocument> {
        const unchangedReview = await this.reviewModel.findOne({ _id: updateReviewAudienceDto.reviewId });

        return await this.reviewModel
            .findOneAndUpdate(
                { _id: updateReviewAudienceDto.reviewId },
                {
                    audienceChanges: [
                        ...unchangedReview.audienceChanges.concat({
                            dateOfChange: new Date().toDateString(),
                            userId: updateReviewAudienceDto.userId,
                            bestFitAudienceBefore: unchangedReview.bestFitAudience,
                            bestFitAudienceAfter: updateReviewAudienceDto.bestFitAudience,
                            bestFitReasoningBefore: unchangedReview.bestFitReasoning,
                            bestFitReasoningAfter: updateReviewAudienceDto.bestFitReasoning,
                        }),
                    ],
                    bestFitAudience: updateReviewAudienceDto.bestFitAudience,
                    bestFitReasoning: updateReviewAudienceDto.bestFitReasoning,
                },
                { new: true },
            )
            .exec();
    }

    async updateTextEdit(review: Partial<ReviewDocument>): Promise<Review> {
        return this.reviewModel.findOneAndUpdate({ _id: review._id }, {
            reviewTextEdited: review.reviewTextEdited
        }, { new: true });
    }
}
