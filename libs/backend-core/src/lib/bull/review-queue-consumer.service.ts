import { OpenAiService } from '../open-ai/open-ai.service';
import { ReviewGateway } from '../websocket/review.gateway';
import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('review-queue')
export class ReviewQueueConsumerService {
    constructor(private readonly openAiService: OpenAiService, private readonly reviewGateway: ReviewGateway) {}

    @Process('classify')
    async processJob(job: Job<any>): Promise<void> {
        try {
            console.log(`Processing job ${job.id} with data:`, job.data);
            const result = await this.openAiService.updateReviewWithClassification(job.data);
            console.log(`Processing job ${job.id} completed successfully`);

            // Emit the event after the job is completed
            console.log(`Result from processJob: ${result} result type ${typeof result}`);
            this.reviewGateway.server.emit('reviewProcessed', result);
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
