import { OpenAiModule } from '../open-ai/open-ai.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { ReviewQueueConsumerService } from './review-queue/review-queue-consumer.service';
import { ReviewQueueProducerService } from './review-queue/review-queue-producer.service';
import { Ad, AdSchema, AdSet, AdSetSchema, Review, ReviewSchema } from '@monorepo/type';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdModule } from '../mongo/ad/ad.module';
import { PdfQueueProducerService } from './pdf-queue/pdf-queue-producer.service';
import { PdfQueueConsumerService } from './pdf-queue/pdf-queue-consumer.service';
import { HttpModule } from '@nestjs/axios';
import { AdSetModule } from '../mongo/ad-set/ad-set.module';
import { PdfModule } from '../pdf/pdf.module';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                password: process.env.REDIS_PASSWORD,
            },
        }),
        BullModule.registerQueue({
            name: 'review-queue',
        }),
        BullModule.registerQueue({
            name: 'pdf-queue',
        }),
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        PdfModule,
        OpenAiModule,
        WebsocketModule,
        HttpModule,
    ],
    providers: [ReviewQueueConsumerService, ReviewQueueProducerService, PdfQueueConsumerService, PdfQueueProducerService],
    exports: [BullModule, ReviewQueueProducerService, PdfQueueProducerService],
})
export class BullConfigModule {}
