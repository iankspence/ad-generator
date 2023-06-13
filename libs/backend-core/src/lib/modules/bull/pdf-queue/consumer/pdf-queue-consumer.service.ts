import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PdfService } from '../../../pdf/pdf.service';
import { CreatePdfJob } from '@monorepo/type';
import { LoggerService } from '../../../logger/logger.service';

@Processor(`pdf-queue`)
export class PdfQueueConsumerService {
    constructor(
        private readonly pdfService: PdfService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext('PdfQueueConsumerService');
    }

    @Process(`${process.env.CONFIG_ENV}-create-pdf`)
    async createPdf(job: Job<CreatePdfJob>): Promise<void> {
        this.logger.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);
        await this.pdfService.createPdf({
            adSet: job.data.adSet,
            accountId: job.data.accountId,
        });
    }

    @OnQueueActive()
    onActive(job: Job) {
        this.logger.log(`Processing job started: ${job.id}`);
    }

    @OnQueueCompleted()
    async onPdfCreationCompleted(job: Job) {
        this.logger.log(`Processing job completed: ${job.id}`);
    }
}
