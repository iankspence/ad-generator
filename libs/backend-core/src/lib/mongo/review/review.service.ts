import { ReviewQueueProducerService } from '../../bull/review-queue-producer.service';
import { Review, ReviewDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private reviewQueueProducerService: ReviewQueueProducerService,
    ) {}

    async createRateMdsReview(userId: string, accountId: string, review: Partial<Review>): Promise<void> {
        const convertedReview = {
            userId,
            accountId,
            source: 'RateMDs',
            staffRating: review['Staff Rating'],
            punctualityRating: review['Punctuality Rating'],
            helpfulnessRating: review['Helpfulness Rating'],
            knowledgeRating: review['Knowledge Rating'],
            reviewText: review['Review Text'],
            reviewDate: review['Review Date'],
            responseDate: review['Response Date'],
            responseText: review['Response Text'],
        };
        console.log('convertedReview', convertedReview);

        const reviewDocument = await this.reviewModel.create(convertedReview);
        return this.reviewQueueProducerService.addClassifyJob(reviewDocument);
    }

    async createGoogleReview(userId: string, accountId: string, review: Partial<Review>): Promise<void> {
        // console.log('createGoogleReview', userId, accountId, review);
        const convertedReview = {
            userId,
            accountId,
            source: 'Google',
            authorTitle: review['author_title'],
            reviewText: review['review_text'],
            reviewDate: new Date(review['review_datetime_utc']),
            responseDate: new Date(review['owner_answer_timestamp_datetime_utc']),
            responseText: review['owner_answer'],
            reviewRating: review['review_rating'],
        };
        console.log('convertedReview', convertedReview);

        const reviewDocument = await this.reviewModel.create(convertedReview);

        return this.reviewQueueProducerService.addClassifyJob(reviewDocument);
    }
}
