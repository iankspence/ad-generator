import { OpenAiService } from '../open-ai/open-ai.service';
import { ReviewGateway } from '../websocket/review.gateway';
import { ReviewQueueProducerService } from './review-queue-producer.service';
import { Review, ReviewDocument } from '@monorepo/type';
import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import * as crypto from 'crypto';
import { Model } from 'mongoose';

function createReviewSourceTextHash(source: string, reviewText: string) {
    const combinedText = `${source} ${reviewText}`;
    const hash = crypto.createHash('md5');
    hash.update(combinedText);
    return hash.digest('hex');
}

@Processor('review-queue')
export class ReviewQueueConsumerService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private readonly openAiService: OpenAiService,
        private readonly reviewGateway: ReviewGateway,
        private readonly reviewQueueProducerService: ReviewQueueProducerService,
    ) {}

    async createReviewWithHash(review: Partial<ReviewDocument>): Promise<ReviewDocument | null> {
        const reviewSourceTextHash = createReviewSourceTextHash(review.source, review.reviewText);

        const existingReview = await this.reviewModel.findOne({
            sourceTextHash: reviewSourceTextHash,
        });
        if (existingReview) {
            console.log(`Review already exists, skipping`);
            return null;
        }

        review.sourceTextHash = reviewSourceTextHash;
        return this.reviewModel.create(review);
    }

    @Process('create-rate-mds-review')
    async createRateMdsReview(job: Job<any>): Promise<void> {
        console.log(`Processing job ${job.id} with data:`, job.data);
        const reviewDocument = await this.createReviewWithHash(job.data.review);
        console.log(`Processing job ${job.id} completed successfully`);
        if (!reviewDocument) {
            return;
        } else {
            return this.reviewQueueProducerService.addClassifyJob(reviewDocument);
        }
    }

    @Process('create-google-review')
    async createGoogleReview(job: Job<any>): Promise<void> {
        console.log(`Processing job ${job.id} with data:`, job.data);
        const reviewDocument = await this.createReviewWithHash(job.data.review);
        console.log(`Processing job ${job.id} completed successfully`);

        if (!reviewDocument) {
            return;
        } else {
            return this.reviewQueueProducerService.addClassifyJob(reviewDocument);
        }
    }

    @Process('classify')
    async processJob(job: Job<any>): Promise<void> {
        try {
            console.log(`Processing job ${job.id} with data:`, job.data);
            const result = await this.openAiService.updateReviewWithClassification(job.data);
            console.log(`Processing job ${job.id} completed successfully`);

            this.reviewGateway.server.emit('reviewProcessed', result);
        } catch (error) {
            console.error(`Error processing job ${job.id}:`, error);
        }
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Processing job started: ${job.id}`);
    }

    @OnQueueCompleted()
    onComplete(job: Job, result: any) {
        console.log(`Processing job completed: ${job.id}`);
    }
}
