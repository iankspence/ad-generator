import { OpenAiModule } from '../open-ai/open-ai.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { ReviewQueueConsumerService } from './review-queue-consumer.service';
import { ReviewQueueProducerService } from './review-queue-producer.service';
import { Review, ReviewSchema } from '@monorepo/type';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        OpenAiModule,
        WebsocketModule,
    ],
    providers: [ReviewQueueConsumerService, ReviewQueueProducerService],
    exports: [BullModule, ReviewQueueProducerService],
})
export class BullConfigModule {}
