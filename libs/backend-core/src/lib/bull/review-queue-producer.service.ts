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
}
