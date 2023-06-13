import { CreateRateMdsReviewJob, Review, ReviewDocument } from '@monorepo/type';
import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { LoggerService } from '../../../logger/logger.service';
import { createReviewWithHash } from '../utils/create-review-with-hash';
import { ReviewQueueProducerService } from '../producer/review-queue-producer.service';

@Processor('create-rate-mds-review-queue')
export class CreateRateMdsReviewQueueConsumerService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private readonly reviewQueueProducerService: ReviewQueueProducerService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('CreateRateMdsReviewQueueConsumerService');
    }

    @Process(`${process.env.CONFIG_ENV}-create-rate-mds-review`)
    async createRateMdsReview(job: Job<CreateRateMdsReviewJob>): Promise<void> {
        this.logger.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);
        const reviewDocument = await createReviewWithHash({
            review: job.data.review,
        }, this.reviewModel);
        this.logger.log(`Processing job ${job.id} completed successfully`);
        if (!reviewDocument) {
            return;
        } else {
            this.logger.verbose(`Review created for account: ${reviewDocument.accountId}, adding classify job: ${job.id}`)
            return this.reviewQueueProducerService.addClassifyReviewJob({
                review: reviewDocument,
            });
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
}
