import { ReviewQueueProducerService } from '../bull/review-queue-producer.service';
import { ReviewDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OutscraperService {
    private apiKey: string;

    constructor(private reviewQueueProducerService: ReviewQueueProducerService) {
        this.apiKey = process.env.OUTSCRAPER_API_KEY;
        if (!this.apiKey) {
            throw new Error('Outscraper API key is not set in the environment variables');
        }
    }

    async getGoogleMapsReviews(
        userId: string,
        accountId: string,
        query: string,
        reviewsLimit: number,
        limit: number,
        language: string,
        region: 'CA',
    ) {
        try {
            console.log(`handling getGoogleMapsReviews data (service)`);

            const response = await axios.get(`https://api.app.outscraper.com/maps/reviews-v3`, {
                params: {
                    query: query,
                    // limit: limit,
                    // language: language,
                    // region: region,
                    // reviewsLimit: reviewsLimit,
                    ignoreEmpty: true,
                    reviewsLimit: 2,
                    async: true,
                },
                headers: {
                    'X-API-KEY': this.apiKey,
                },
            });

            console.log('Task initialized:', response.data);
            await this.pollTaskResults(userId, accountId, response.data.id);
        } catch (error) {
            throw new Error(`Error fetching reviews: ${error.message}`);
        }
    }

    async pollTaskResults(userId: string, accountId: string, taskId: string) {
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
                response.data.data[0].reviews_data.forEach((review) => {
                    console.log('review:', review);
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
                    this.reviewQueueProducerService.addCreateGoogleReviewJob(convertedReview);
                });
            }
        };
        checkResults();
    }
}
