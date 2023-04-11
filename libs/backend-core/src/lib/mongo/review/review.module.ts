import { OpenAiModule } from '../../open-ai/open-ai.module';
import { ReviewModelService } from './review-model.service';
import { Review, ReviewSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]), OpenAiModule],
    providers: [ReviewModelService],
    exports: [ReviewModelService],
})
export class ReviewModule {}
