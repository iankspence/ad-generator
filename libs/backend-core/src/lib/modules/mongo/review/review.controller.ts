import { ReviewService } from './review.service';
import {
    FindReviewsByAccountIdDto,
    Review,
    ReviewDocument,
    UpdateReviewAudienceDto,
    UpdateReviewTextEditDto,
} from '@monorepo/type';
import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../../auth/roles.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UseGuards(JwtAuthGuard)
    @Post('find-by-account-id')
    async findReviewsByAccountId(@Body() findReviewsByAccountIdDto: FindReviewsByAccountIdDto): Promise<Review[]> {
        return this.reviewService.findReviewsByAccountId(findReviewsByAccountIdDto.accountId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-text-edit')
    async updateTextEdit(@Body() updateReviewTextEdit: UpdateReviewTextEditDto): Promise<Review> {
        return await this.reviewService.updateTextEdit(updateReviewTextEdit.review);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-audience')
    async updateReviewAudience(@Body() updateReviewAudienceDto: UpdateReviewAudienceDto ): Promise<ReviewDocument> {
        return this.reviewService.updateReviewAudience(updateReviewAudienceDto);
    }
}
