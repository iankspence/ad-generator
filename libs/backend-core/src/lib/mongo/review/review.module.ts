import { BullConfigModule } from '../../bull/bull.module';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]), BullConfigModule],
    providers: [ReviewService],
    exports: [ReviewService],
})
export class ReviewModule {}
