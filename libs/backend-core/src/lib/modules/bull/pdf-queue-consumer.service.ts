import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PdfService } from '../pdf/pdf.service';

@Processor('pdf-queue')
export class PdfQueueConsumerService {
    constructor(
        private readonly pdfService: PdfService,
    ) {}

    @Process('create-pdf')
    async createPdf(job: Job<any>): Promise<void> {
        console.log(`Processing job ${job.id} with data:`, job.data);
        await this.pdfService.createPdf(job.data.adSet, job.data.accountId);
        console.log(`Processing job ${job.id} completed successfully`);
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Processing job started: ${job.id}`);
    }

    @OnQueueCompleted()
    async onPdfCreationCompleted(job: Job) {
        console.log(`Processing job completed: ${job.id}`);
    }

}
