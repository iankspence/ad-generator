import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AdService } from '../mongo/ad/ad.service';

@Processor('pdf-queue')
export class PdfQueueConsumerService {
    constructor(
        private readonly adService: AdService,
    ) {}

    @Process('create-pdf')
    async createPdf(job: Job<any>): Promise<void> {
        console.log(`Processing job ${job.id} with data:`, job.data);
        await this.adService.createPdf(job.data.ad);
        console.log(`Processing job ${job.id} completed successfully`);
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
