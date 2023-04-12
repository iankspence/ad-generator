import { OpenAiService } from '../open-ai/open-ai.service';
import { ReviewGateway } from '../websocket/review.gateway';
import { ReviewQueueProducerService } from './review-queue-producer.service';
import { Review, ReviewDocument } from '@monorepo/type';
import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';

@Processor('review-queue')
export class ReviewQueueConsumerService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private readonly openAiService: OpenAiService,
        private readonly reviewGateway: ReviewGateway,
        private readonly reviewQueueProducerService: ReviewQueueProducerService,
    ) {}

    @Process('create-rate-mds-review')
    async createRateMdsReview(job: Job<any>): Promise<void> {
        const { review } = job.data;
        const reviewDocument = await this.reviewModel.create(review);
        return this.reviewQueueProducerService.addClassifyJob(reviewDocument);
    }

    @Process('create-google-review')
    async createGoogleReview(job: Job<any>): Promise<void> {
        const { review } = job.data;
        const reviewDocument = await this.reviewModel.create(review);
        return this.reviewQueueProducerService.addClassifyJob(reviewDocument);
    }

    @Process('classify')
    async processJob(job: Job<any>): Promise<void> {
        try {
            console.log(`Processing job ${job.id} with data:`, job.data);
            const result = await this.openAiService.updateReviewWithClassification(job.data);
            console.log(`Processing job ${job.id} completed successfully`);

            // Emit the event after the job is completed
            console.log(`Result from processJob: ${result} result type ${typeof result}`);
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
