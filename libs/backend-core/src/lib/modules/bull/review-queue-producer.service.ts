import { audiences } from '../../utils/constants/audiences';
import { HookDocument, ReviewDocument } from '@monorepo/type';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ReviewQueueProducerService {
    constructor(@InjectQueue('review-queue') private readonly reviewQueue: Queue) {}

    async addCreateRateMdsReviewJob(review: Partial<ReviewDocument>) {
        console.log('Adding create-rate-mds-review job for review', review);
        await this.reviewQueue.add('create-rate-mds-review', { review });
    }

    async addCreateGoogleReviewJob(review: Partial<ReviewDocument>) {
        console.log('Adding create-google-review job for review', review);
        await this.reviewQueue.add('create-google-review', { review });
    }

    async addClassifyJob(review: ReviewDocument) {
        console.log('Adding classify job for review', review);
        await this.reviewQueue.add('classify', { review });
    }

    async addExtractHooksFromReviewJob(review: ReviewDocument) {
        console.log('Adding extract-hooks-from-review job for review', review);
        await this.reviewQueue.add('extract-hooks-from-review', { review });
    }

    async addGenerateClaimsCopyCloseJob(review: ReviewDocument, hook: Partial<HookDocument>) {
        console.log(`Adding generate-claims-copy-close job for review ${review} and hook ${hook}`);

        await this.reviewQueue.add('generate-claim-copy-close', {
            review,
            hook,
        });
    }
}
