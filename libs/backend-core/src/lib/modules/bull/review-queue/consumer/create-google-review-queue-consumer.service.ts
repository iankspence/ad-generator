import { CreateGoogleReviewJob, Review, ReviewDocument } from '@monorepo/type';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { LoggerService } from '../../../logger/logger.service';
import { createReviewWithHash } from '../utils/create-review-with-hash';
import { ReviewQueueProducerService } from '../producer/review-queue-producer.service';

@Processor('create-google-review-queue')
export class CreateGoogleReviewQueueConsumerService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private readonly reviewQueueProducerService: ReviewQueueProducerService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('CreateGoogleReviewQueueConsumerService');
    }

    @Process(`${process.env.CONFIG_ENV}-create-google-review`)
    async createGoogleReview(job: Job<CreateGoogleReviewJob>): Promise<void> {
        this.logger.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);
        try {
            const reviewDocument = await createReviewWithHash({
                review: job.data.review,
            }, this.reviewModel);

            if (!reviewDocument) {
                return;
            } else {
                this.logger.verbose(`Review created for account: ${reviewDocument.accountId}, adding classify job: ${job.id}`)
                return this.reviewQueueProducerService.addClassifyReviewJob({
                    review: reviewDocument,
                });
            }
        } catch (error) {
            this.logger.error(`Error processing job ${job.id}: ${error.message}`, error.stack);
            throw error;
        }
    }

    @OnQueueActive()
    onActive(job: Job) {
        this.logger.log(`Processing job started: ${job.id}`);
    }

    @OnQueueCompleted()
    onComplete(job: Job) {
        this.logger.log(`Processing job completed: ${job.id}`);
    }

    @OnQueueFailed()
    onFailed(job: Job, error: Error) {
        this.logger.error(`Job ${job.id} has failed: ${error.message}`, error.stack);
    }
}
