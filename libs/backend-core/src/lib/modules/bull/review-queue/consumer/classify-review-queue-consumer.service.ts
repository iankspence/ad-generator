import { ClassifyReviewJob, Review, ReviewDocument } from '@monorepo/type';
import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { LoggerService } from '../../../logger/logger.service';
import { ReviewQueueProducerService } from '../producer/review-queue-producer.service';
import { OpenAiService } from '../../../open-ai/open-ai.service';

@Processor('classify-review-queue')
export class ClassifyReviewQueueConsumerService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private readonly openAiService: OpenAiService,
        private readonly reviewQueueProducerService: ReviewQueueProducerService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('ClassifyReviewQueueConsumerService');
    }

    @Process(`${process.env.CONFIG_ENV}-classify-review`)
    async classifyReview(job: Job<ClassifyReviewJob>): Promise<void> {
        try {
            this.logger.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);
            const result = await this.openAiService.updateReviewWithClassification({
                review: job.data.review,
            });

            if (result.bestFitAudience) {
                this.logger.verbose(`Best fit audience of ${result.bestFitAudience} found for job ${job.id}, now extracting hooks`);
                return this.reviewQueueProducerService.addExtractHooksFromReviewJob({
                    review: result,
                });
            } else {
                this.logger.log(`No best fit audience found for job ${job.id}, skipping hook extraction`);
                return;
            }
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
