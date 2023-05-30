import { ReviewService } from './review.service';
import { Review, ReviewDocument } from '@monorepo/type';
import { Get, Controller, Param, Patch, Body, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../../auth/roles.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Public } from '../../auth/public.decorator';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post('update-text-edit')
    async updateText(@Body() {review}: {review: Partial<ReviewDocument>}): Promise<Review> {
        return await this.reviewService.updateTextEdit(review);
    }

    @Public()
    @Get('account/:accountId')
    async getReviewsByAccountId(@Param('accountId') accountId: string): Promise<Review[]> {
        return this.reviewService.getReviewsByAccountId(accountId);
    }

    @UseGuards(JwtAuthGuard)
    @Roles('admin', 'content-manager')
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
