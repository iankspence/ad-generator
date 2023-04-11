import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';
import { Review, ReviewSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
    controllers: [OpenAiController],
    providers: [OpenAiService],
    exports: [OpenAiService],
})
export class OpenAiModule {}
