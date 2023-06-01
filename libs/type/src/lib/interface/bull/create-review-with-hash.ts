import { ReviewDocument } from '../../schema/review';

export interface CreateReviewWithHash {
    review: Partial<ReviewDocument>
}
