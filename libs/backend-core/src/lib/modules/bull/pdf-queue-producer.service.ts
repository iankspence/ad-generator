import { AdSetDocument } from '@monorepo/type';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class PdfQueueProducerService {
    constructor(@InjectQueue('pdf-queue') private readonly pdfQueue: Queue) {}

    async addCreatePdfJob(adSet: AdSetDocument, accountId: string) {
        console.log('Adding create-pdf job for ad', adSet);
        await this.pdfQueue.add('create-pdf', { adSet, accountId });
    }
    async addMergePdfsJob(adSetId: string) {
        console.log('Adding merge-pdfs job for ad set', adSetId);
        await this.pdfQueue.add('merge-pdfs', { adSetId });
    }
}
