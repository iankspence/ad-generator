export class UpdateReviewAudienceDto {
    userId!: string;
    reviewId!: string;
    bestFitAudience!: number;
    bestFitReasoning!: string;
}



// user._id.toString(), review._id.toString(), Number(newAudiencePosition.toString()), newAudienceReasoning
