import { CreateReviewWithHash, ReviewDocument } from '@monorepo/type';
import { createReviewSourceTextHash } from './create-review-source-text-hash';
import { Model } from 'mongoose';

export async function createReviewWithHash(createReviewWithHash: CreateReviewWithHash, reviewModel: Model<ReviewDocument>): Promise<ReviewDocument | null> {
    const reviewSourceTextHash = createReviewSourceTextHash({
        source: createReviewWithHash.review.source,
        reviewText: createReviewWithHash.review.reviewText,
    });

    const existingReview = await reviewModel.findOne({
        sourceTextHash: reviewSourceTextHash,
    });

    if (existingReview) {
        return null;
    }

    createReviewWithHash.review.sourceTextHash = reviewSourceTextHash;
    return reviewModel.create(createReviewWithHash.review);
}
