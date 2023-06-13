import { ClassifyReviewJob, ExtractHooksFromReviewJob, HookDocument, Review, ReviewDocument } from '@monorepo/type';
import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { LoggerService } from '../../../logger/logger.service';
import { ReviewQueueProducerService } from '../producer/review-queue-producer.service';
import { OpenAiService } from '../../../open-ai/open-ai.service';

@Processor('extract-hooks-from-review-queue')
export class ExtractHooksFromReviewQueueConsumerService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private readonly openAiService: OpenAiService,
        private readonly reviewQueueProducerService: ReviewQueueProducerService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('ExtractHooksFromReviewQueueConsumerService');
    }

    @Process(`${process.env.CONFIG_ENV}-extract-hooks-from-review`)
    async extractHooksFromReview(job: Job<ExtractHooksFromReviewJob>): Promise<void> {
        try {
            this.logger.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);
            const newHooks = await this.openAiService.extractHooksFromReview({
                    reviewId: job.data.review._id.toString(),
                    reviewText: job.data.review.reviewText,
                    accountId: job.data.review.accountId,
                    userId: job.data.review.userId,
                }
            );

            this.logger.verbose(`Extracted ${newHooks.length} hooks from review ${job.data.review._id.toString()}`);
            newHooks.map((hook: Partial<HookDocument>) => {
                return this.reviewQueueProducerService.addGenerateClaimCopyCloseJob({
                    review: job.data.review,
                    hook,
                });
            });

        } catch (error) {
            this.logger.error(`Error processing job ${job.id}:`, error);
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
