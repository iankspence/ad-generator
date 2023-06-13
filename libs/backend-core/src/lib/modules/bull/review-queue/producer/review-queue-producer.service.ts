import { ClassifyReviewJob, CreateGoogleReviewJob, ExtractHooksFromReviewJob } from '@monorepo/type';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateRateMdsReviewJob, GenerateClaimCopyCloseJob } from '@monorepo/type';
import { LoggerService } from '../../../logger/logger.service';

@Injectable()
export class ReviewQueueProducerService {
    constructor(
        @InjectQueue('create-rate-mds-review-queue') private readonly createRateMdsReviewQueue: Queue,
        @InjectQueue('create-google-review-queue') private readonly createGoogleReviewQueue: Queue,
        @InjectQueue('classify-review-queue') private readonly classifyReviewQueue: Queue,
        @InjectQueue('extract-hooks-from-review-queue') private readonly extractHooksFromReviewQueue: Queue,
        @InjectQueue('generate-claim-copy-close-queue') private readonly generateClaimCopyCloseQueue: Queue,

        private readonly logger: LoggerService,
    ) {
        this.logger.setContext('ReviewQueueProducerService');
    }

    async addCreateRateMdsReviewJob(createRateMdsReviewJob: CreateRateMdsReviewJob) {
        this.logger.log(`Adding create-rate-mds-review job for account: ${createRateMdsReviewJob.review.accountId}`);
        await this.createRateMdsReviewQueue.add(`${process.env.CONFIG_ENV}-create-rate-mds-review`, createRateMdsReviewJob, {priority: 1});
    }

    async addCreateGoogleReviewJob(createGoogleReviewJob: CreateGoogleReviewJob) {
        this.logger.log(`Adding create-google-review job for account: ${createGoogleReviewJob.review.accountId}`);
        await this.createGoogleReviewQueue.add(`${process.env.CONFIG_ENV}-create-google-review`, createGoogleReviewJob, {priority: 1});
    }

    async addClassifyReviewJob(classifyReviewJob: ClassifyReviewJob) {
        this.logger.log(`Adding classify job for account: ${classifyReviewJob.review.accountId}`);
        await this.classifyReviewQueue.add(`${process.env.CONFIG_ENV}-classify-review`, classifyReviewJob, {priority: 2});
    }

    async addExtractHooksFromReviewJob(extractHooksFromReviewJob: ExtractHooksFromReviewJob) {
        this.logger.log(`Adding extract-hooks-from-review job for account: ${extractHooksFromReviewJob.review.accountId}`);
        await this.extractHooksFromReviewQueue.add(`${process.env.CONFIG_ENV}-extract-hooks-from-review`, extractHooksFromReviewJob, {priority: 3});
    }

    async addGenerateClaimCopyCloseJob(generateClaimCopyCloseJob: GenerateClaimCopyCloseJob) {
        this.logger.log(`Adding generate-claims-copy-close job for account: ${generateClaimCopyCloseJob.review.accountId}`);
        await this.generateClaimCopyCloseQueue.add(`${process.env.CONFIG_ENV}-generate-claim-copy-close`, generateClaimCopyCloseJob, {priority: 4});
    }
}
