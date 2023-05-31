import { OutscraperService } from './outscraper.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ScrapeGoogleMapsReviewsDto } from '@monorepo/type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('outscraper')
export class OutscraperController {
    constructor(private readonly outscraperService: OutscraperService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('reviews')
    async scrapeGoogleMapsReviews(
        @Body() scrapeGoogleMapsReviewsDto: ScrapeGoogleMapsReviewsDto,
    ) {
        try {
            await this.outscraperService.scrapeGoogleMapsReviews(
                scrapeGoogleMapsReviewsDto
            );
            return { message: 'Task initialized' };
        } catch (error) {
            return { message: `Error fetching reviews: ${error.message}` };
        }
    }
}
