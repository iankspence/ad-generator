import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PdfService } from '../../pdf/pdf.service';
import { CreatePdfJob } from '@monorepo/type';

@Processor('pdf-queue')
export class PdfQueueConsumerService {
    constructor(
        private readonly pdfService: PdfService,
    ) {}

    @Process('create-pdf')
    async createPdf(job: Job<CreatePdfJob>): Promise<void> {
        console.log(`Processing job ${job.id} with data:`, job.data);
        await this.pdfService.createPdf({
            adSet: job.data.adSet,
            accountId: job.data.accountId,
        });
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
