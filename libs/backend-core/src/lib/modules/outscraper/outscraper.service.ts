import { ReviewQueueProducerService } from '../bull/review-queue/producer/review-queue-producer.service';
import { ReviewDocument, ScrapeGoogleMapsReviewsDto, ExternalGoogleMapsReviewsV3Dto } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class OutscraperService {
    private readonly apiKey: string;
    constructor(private reviewQueueProducerService: ReviewQueueProducerService,
                private readonly logger: LoggerService) {
        this.apiKey = process.env.OUTSCRAPER_API_KEY;
        if (!this.apiKey) {
            throw new Error('Outscraper API key is not set in the environment variables');
        }
        this.logger.setContext('OutscraperService');
    }
    async scrapeGoogleMapsReviews(scrapeGoogleMapsReviewsDto: ScrapeGoogleMapsReviewsDto) {
        this.logger.log(`Scraping Google Maps reviews for ${scrapeGoogleMapsReviewsDto.query}`)

        const externalGoogleMapsReviewsV3Dto: ExternalGoogleMapsReviewsV3Dto = {
            query: scrapeGoogleMapsReviewsDto.query,
            limit: 1,
            sort: 'newest',
            language: 'en',
            region: 'CA',
            reviewsLimit: scrapeGoogleMapsReviewsDto.reviewsLimit,
            ignoreEmpty: true,
            async: true,
        }

        this.logger.verbose(`Scraping Google Maps reviews with params: ${JSON.stringify(externalGoogleMapsReviewsV3Dto)}`)

        try {
            const response = await axios.get(`https://api.app.outscraper.com/maps/reviews-v3`, {
                params: externalGoogleMapsReviewsV3Dto,
                headers: {
                    'X-API-KEY': this.apiKey,
                },
            });

            this.logger.log(`Scraping Google Maps reviews for ${scrapeGoogleMapsReviewsDto.query} successful, task id: ${response.data.id}`);
            await this.pollTaskResults(scrapeGoogleMapsReviewsDto.userId, scrapeGoogleMapsReviewsDto.accountId, response.data.id);
        } catch (error) {
            throw new Error(`Error fetching reviews: ${error.message}`);
        }
    }

    async pollTaskResults(userId: string, accountId: string, taskId: string) {
        this.logger.log(`Polling task results for task id: ${taskId}`);
        const resultsUrl = `https://api.app.outscraper.com/requests/${taskId}`;

        const checkResults = async () => {
            const response = await axios.get(resultsUrl, {
                headers: {
                    'X-API-KEY': this.apiKey,
                },
            });

            if (response.data.status === 'Pending') {
                setTimeout(checkResults, 5000); // Poll every 5 seconds
            } else {
                this.logger.log(`Task ${taskId} completed, adding ${response.data.data[0].reviews_data.length} reviews to queue`);

                response.data.data[0].reviews_data.forEach((review) => {
                    const convertedReview: Partial<ReviewDocument> = {
                        userId,
                        accountId,
                        source: 'Google',
                        author: review['author_title'],
                        reviewText: review['review_text'],
                        reviewDate: new Date(review['review_datetime_utc']).toDateString(),
                        responseDate: new Date(review['owner_answer_timestamp_datetime_utc']).toDateString(),
                        responseText: review['owner_answer'],
                        overallRating: review['review_rating'],
                    };
                    this.reviewQueueProducerService.addCreateGoogleReviewJob({
                        review: convertedReview,
                    });
                });
            }
        };
        await checkResults();
    }
}
