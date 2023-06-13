import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreatePdfJob } from '@monorepo/type';
import { LoggerService } from '../../../logger/logger.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PdfQueueProducerService {
    constructor(
        @InjectQueue(`pdf-queue`) private readonly pdfQueue: Queue,
        private readonly logger: LoggerService)
    {
        this.logger.setContext('PdfQueueProducerService');
    }

    async addCreatePdfJob(createPdfJob: CreatePdfJob) {
        this.logger.log(`Adding create-pdf job for ad set ${createPdfJob.adSet._id} to pdf-queue`);
        await this.pdfQueue.add(`${process.env.CONFIG_ENV}-create-pdf`, createPdfJob, {
            jobId: `${process.env.CONFIG_ENV}-create-pdf-${uuidv4()}`
        });
    }
}
