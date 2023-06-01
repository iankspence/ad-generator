import { ReviewDocument } from '../../schema/review';

export interface CreateRateMdsReviewJob {
    review: Partial<ReviewDocument>;
}
