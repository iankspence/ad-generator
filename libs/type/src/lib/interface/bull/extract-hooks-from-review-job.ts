import { ReviewDocument } from '../../schema/review';

export interface ExtractHooksFromReviewJob {
    review: Partial<ReviewDocument>
}
