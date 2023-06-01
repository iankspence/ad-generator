import { ReviewDocument } from '../../schema/review';

export interface ClassifyReviewJob {
    review: Partial<ReviewDocument>
}
