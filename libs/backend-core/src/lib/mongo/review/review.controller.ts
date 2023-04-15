import { ReviewService } from './review.service';
import { Review, ReviewDocument } from '@monorepo/type';
import { Get, Controller, Param, Patch, Body } from '@nestjs/common';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Get('account/:accountId')
    async getReviewsByAccountId(@Param('accountId') accountId: string): Promise<Review[]> {
        return this.reviewService.getReviewsByAccountId(accountId);
    }

    @Patch('update')
    async updateReviewAudience(
        @Body()
        dto: {
            userId: string;
            reviewId: string;
            bestFitAudience: number;
            bestFitReasoning: string;
        },
    ): Promise<ReviewDocument> {
        return this.reviewService.updateReviewAudience(
            dto.userId,
            dto.reviewId,
            dto.bestFitAudience,
            dto.bestFitReasoning,
        );
    }
}
