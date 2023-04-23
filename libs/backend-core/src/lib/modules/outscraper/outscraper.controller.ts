import { OutscraperService } from './outscraper.service';
import { Body, Controller, Post, Req } from '@nestjs/common';

@Controller('outscraper')
export class OutscraperController {
    constructor(private readonly outscraperService: OutscraperService) {}

    @Post('reviews')
    async getGoogleMapsReviews(
        @Body('userId') userId: string,
        @Body('accountId') accountId: string,
        @Body('query') query: string,
    ) {
        console.log(`handling getGoogleMapsReviews data (controller)`);

        console.log(`userId: ${userId}`);
        console.log(`accountId: ${accountId}`);
        console.log(`query: ${query}`);

        const reviewsLimit = 1;
        const limit = 1;
        const language = 'en';
        const region = 'CA';
        try {
            await this.outscraperService.getGoogleMapsReviews(
                userId,
                accountId,
                query,
                reviewsLimit,
                limit,
                language,
                region,
            );
            return { message: 'Task initialized' };
        } catch (error) {
            return { message: `Error fetching reviews: ${error.message}` };
        }
    }

    @Post('webhook')
    async handleWebhook(@Req() req: Request, @Body() webhookData: any): Promise<any> {
        console.log('Webhook request received:', req.headers, webhookData);
        // Process the webhook data here
        return { message: 'Webhook received and processed' };
    }
}
