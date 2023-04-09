import { OpenAiService } from '../../open-ai/open-ai.service';
import { Review, ReviewDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewModelService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private openAiService: OpenAiService,
    ) {}

    async createRateMdsReview(userId: string, clinicId: string, review: Partial<Review>): Promise<Review> {
        const convertedReview = {
            userId,
            clinicId,
            source: 'RateMDs',
            position: review['Position'],
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

        return this.updateReviewWithClassification(reviewDocument);
    }

    async updateReviewWithClassification(review: ReviewDocument): Promise<ReviewDocument> {
        const [bestFitPersona, otherMatchingPersonas] = await this.openAiService.createCompletionGPT4(
            review.reviewText,
        );
        console.log('classificationResponse', [bestFitPersona, otherMatchingPersonas]);

        review.bestFitPersona = bestFitPersona;
        review.otherMatchingPersonas = otherMatchingPersonas;

        return review.save();
    }

    async createGoogleReview(userId: string, clinicId: string, review: Partial<Review>): Promise<Review> {
        const convertedReview = {
            userId,
            clinicId,
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

        return this.updateReviewWithClassification(reviewDocument);
    }
}
