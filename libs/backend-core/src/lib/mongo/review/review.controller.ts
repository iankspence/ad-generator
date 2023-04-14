import { ReviewService } from './review.service';
import { Review } from '@monorepo/type';
import { Get, Controller, Param } from '@nestjs/common';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Get('account/:accountId')
    async getReviewsByAccountId(@Param('accountId') accountId: string): Promise<Review[]> {
        return this.reviewService.getReviewsByAccountId(accountId);
    }
}
