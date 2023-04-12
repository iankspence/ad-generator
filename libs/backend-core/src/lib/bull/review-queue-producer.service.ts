import { ReviewDocument } from '@monorepo/type';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ReviewQueueProducerService {
    constructor(@InjectQueue('review-queue') private readonly reviewQueue: Queue) {}

    async addClassifyJob(review: ReviewDocument) {
        console.log('Adding classify job for review', review);
        await this.reviewQueue.add('classify', { review });
    }

    async addCreateRateMdsReviewJob(review: Partial<ReviewDocument>) {
        console.log('Adding create-rate-mds-review job for review', review);
        await this.reviewQueue.add('create-rate-mds-review', { review });
    }

    async addCreateGoogleReviewJob(review: Partial<ReviewDocument>) {
        console.log('Adding create-google-review job for review', review);
        await this.reviewQueue.add('create-google-review', { review });
    }
}
