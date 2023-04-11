import { OpenAiService } from '../open-ai/open-ai.service';
import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('review-queue')
export class ReviewQueueConsumerService {
    constructor(private readonly openAiService: OpenAiService) {}

    @Process('classify')
    async processJob(job: Job<any>): Promise<void> {
        try {
            console.log(`Processing job ${job.id} with data:`, job.data);
            await this.openAiService.updateReviewWithClassification(job.data);
            console.log(`Processing job ${job.id} completed successfully`);
        } catch (error) {
            console.error(`Error processing job ${job.id}:`, error);
        }
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Processing job started: ${job.id}`);
    }

    @OnQueueCompleted()
    onComplete(job: Job, result: any) {
        console.log(`Processing job completed: ${job.id}`);
    }
}
