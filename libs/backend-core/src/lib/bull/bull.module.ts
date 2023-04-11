import { OpenAiModule } from '../open-ai/open-ai.module';
import { ReviewQueueConsumerService } from './review-queue-consumer.service';
import { ReviewQueueProducerService } from './review-queue-producer.service';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

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
        OpenAiModule,
    ],
    providers: [ReviewQueueConsumerService, ReviewQueueProducerService],
    exports: [BullModule, ReviewQueueProducerService],
})
export class BullConfigModule {}
