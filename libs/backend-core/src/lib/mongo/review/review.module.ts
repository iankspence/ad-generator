import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
    controllers: [ReviewController],
    providers: [ReviewService],
})
export class ReviewModule {}
