import { ReviewDocument } from '../../../schema/review';

export class UpdateReviewTextEditDto {
    review!: Partial<ReviewDocument>;
}
