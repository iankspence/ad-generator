import { ReviewDocument } from '@monorepo/type';

export interface CreateGoogleReviewJob {
    review: Partial<ReviewDocument>
}
