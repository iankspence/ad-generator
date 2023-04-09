import { OutscraperService } from './outscraper.service';
import { Body, Controller, Post, Req } from '@nestjs/common';

@Controller('outscraper')
export class OutscraperController {
    constructor(private readonly outscraperService: OutscraperService) {}

    @Post('reviews')
    async getGoogleMapsReviews(
        @Body('userId') userId: string,
        @Body('clinicId') clinicId: string,
        @Body('query') query: string,
    ) {
        console.log(`handling getGoogleMapsReviews data (controller)`);

        const reviewsLimit = 1;
        const limit = 1;
        const language = 'en';
        const region = 'CA';
        try {
            const response = await this.outscraperService.getGoogleMapsReviews(
                userId,
                clinicId,
                query,
                reviewsLimit,
                limit,
                language,
                region,
            );
            console.log(`response from the controller: ${response}`);
            return response;
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
