import { ReviewService } from './review.service';
import { Close, Review, ReviewDocument } from '@monorepo/type';
import {Get, Controller, Param, Patch, Body, Post, Put} from '@nestjs/common';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Put('update-text-edit')
    async updateText(@Body() review: Partial<Review>): Promise<Review> {
        return await this.reviewService.updateTextEdit(review);
    }

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
