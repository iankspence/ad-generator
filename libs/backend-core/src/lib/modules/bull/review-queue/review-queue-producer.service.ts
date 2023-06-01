import { ClassifyReviewJob, CreateGoogleReviewJob, ExtractHooksFromReviewJob } from '@monorepo/type';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateRateMdsReviewJob, GenerateClaimCopyCloseJob } from '@monorepo/type';

@Injectable()
export class ReviewQueueProducerService {
    constructor(@InjectQueue('review-queue') private readonly reviewQueue: Queue) {}

    async addCreateRateMdsReviewJob(createRateMdsReviewJob: CreateRateMdsReviewJob) {
        console.log('Adding create-rate-mds-review job for review', createRateMdsReviewJob.review);
        await this.reviewQueue.add('create-rate-mds-review', createRateMdsReviewJob);
    }

    async addCreateGoogleReviewJob(createGoogleReviewJob: CreateGoogleReviewJob) {
        console.log('Adding create-google-review job for review', createGoogleReviewJob.review);
        await this.reviewQueue.add('create-google-review', createGoogleReviewJob);
    }

    async addClassifyReviewJob(classifyReviewJob: ClassifyReviewJob) {
        console.log('Adding classify job for review', classifyReviewJob.review);
        await this.reviewQueue.add('classify-review', classifyReviewJob);
    }

    async addExtractHooksFromReviewJob(extractHooksFromReviewJob: ExtractHooksFromReviewJob) {
        console.log('Adding extract-hooks-from-review job for review', extractHooksFromReviewJob.review);
        await this.reviewQueue.add('extract-hooks-from-review', extractHooksFromReviewJob);
    }

    async addGenerateClaimCopyCloseJob(generateClaimCopyCloseJob: GenerateClaimCopyCloseJob) {
        console.log(`Adding generate-claims-copy-close job for review ${generateClaimCopyCloseJob.review} and hook ${generateClaimCopyCloseJob.hook}`);
        await this.reviewQueue.add('generate-claim-copy-close', generateClaimCopyCloseJob);
    }
}
