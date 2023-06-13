import { GenerateClaimCopyCloseJob, Review, ReviewDocument } from '@monorepo/type';
import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { LoggerService } from '../../../logger/logger.service';
import { ReviewQueueProducerService } from '../producer/review-queue-producer.service';
import { OpenAiService } from '../../../open-ai/open-ai.service';
import { audiences } from '../../../../utils/constants/audiences';

@Processor('generate-claim-copy-close-queue')
export class GenerateClaimCopyCloseQueueConsumerService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private readonly openAiService: OpenAiService,
        private readonly reviewQueueProducerService: ReviewQueueProducerService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('GenerateClaimCopyCloseQueueConsumerService');
    }

    @Process(`${process.env.CONFIG_ENV}-generate-claim-copy-close`)
    async generateClaimCopyClose(job: Job<GenerateClaimCopyCloseJob>): Promise<void> {
        try {
            this.logger.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);

            const audience = audiences[job.data.review.bestFitAudience - 1];

            await this.openAiService.generateClaimCopyClose({
                    accountId: job.data.review.accountId,
                    reviewId: job.data.review._id.toString(),
                    reviewText: job.data.review.reviewText,
                    hookId: job.data.hook._id.toString(),
                    hookText: job.data.hook.hookText,
                    reviewAudienceName: audience.name,
                    reviewAudienceAge: audience.ageRange,
                }
            );

            this.logger.verbose(`Generated claim copy close for hook ${job.data.hook._id.toString()} and review ${job.data.review._id.toString()}`);
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
