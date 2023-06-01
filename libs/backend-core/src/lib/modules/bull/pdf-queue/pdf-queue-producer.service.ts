import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreatePdfJob } from '@monorepo/type';

@Injectable()
export class PdfQueueProducerService {
    constructor(@InjectQueue('pdf-queue') private readonly pdfQueue: Queue) {}

    async addCreatePdfJob(createPdfJob: CreatePdfJob) {
        console.log('Adding create-pdf job for ad set', createPdfJob.adSet._id);
        await this.pdfQueue.add('create-pdf', createPdfJob);
    }
}
