import { OpenAiModule } from '../open-ai/open-ai.module';
import { ReviewQueueProducerService } from './review-queue/producer/review-queue-producer.service';
import { Review, ReviewSchema } from '@monorepo/type';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfQueueProducerService } from './pdf-queue/producer/pdf-queue-producer.service';
import { PdfQueueConsumerService } from './pdf-queue/consumer/pdf-queue-consumer.service';
import { HttpModule } from '@nestjs/axios';
import { PdfModule } from '../pdf/pdf.module';
import { ClassifyReviewQueueConsumerService } from './review-queue/consumer/classify-review-queue-consumer.service';
import { CreateGoogleReviewQueueConsumerService } from './review-queue/consumer/create-google-review-queue-consumer.service';
import { CreateRateMdsReviewQueueConsumerService } from './review-queue/consumer/create-rate-mds-review-queue-consumer.service';
import {
    ExtractHooksFromReviewQueueConsumerService
} from './review-queue/consumer/extract-hooks-from-review-queue-consumer.service';
import {
    GenerateClaimCopyCloseQueueConsumerService
} from './review-queue/consumer/generate-claim-copy-close-queue-consumer.service';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                password: process.env.REDIS_PASSWORD,
            },
        }),

        // Review Queues
        BullModule.registerQueue({
            name: 'create-rate-mds-review-queue',
            limiter: {
                max: 1,
                duration: 4000,
            },
        }),
        BullModule.registerQueue({
            name: 'create-google-review-queue',
            limiter: {
                max: 1,
                duration: 4000,
            },
        }),
        BullModule.registerQueue({
            name: 'classify-review-queue',
            limiter: {
                max: 1,
                duration: 7000,
            }
        }),
        BullModule.registerQueue({
            name: 'extract-hooks-from-review-queue',
            limiter: {
                max: 1,
                duration: 7000,
            }
        }),
        BullModule.registerQueue({
            name: 'generate-claim-copy-close-queue',
            limiter: {
                max: 1,
                duration: 7000,
            }
        }),

        // PDF Queue
        BullModule.registerQueue({
            name: 'pdf-queue',
            limiter: {
                max: 1,
                duration: 7000,
            }
        }),

        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        PdfModule,
        OpenAiModule,
        HttpModule,
    ],
    providers: [
        // Review Queues
        ClassifyReviewQueueConsumerService,
        CreateGoogleReviewQueueConsumerService,
        CreateRateMdsReviewQueueConsumerService,
        ExtractHooksFromReviewQueueConsumerService,
        GenerateClaimCopyCloseQueueConsumerService,
        ReviewQueueProducerService,

        // PDF Queue
        PdfQueueConsumerService,
        PdfQueueProducerService
    ],
    exports: [BullModule, ReviewQueueProducerService, PdfQueueProducerService],
})
export class BullConfigModule {}
