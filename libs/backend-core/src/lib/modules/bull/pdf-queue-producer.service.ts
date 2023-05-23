import { AdDocument } from '@monorepo/type';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class PdfQueueProducerService {
    constructor(@InjectQueue('pdf-queue') private readonly pdfQueue: Queue) {}

    async addCreatePdfJob(ad: Partial<AdDocument>) {
        console.log('Adding create-pdf job for ad', ad);
        await this.pdfQueue.add('create-pdf', { ad });
    }
}
