import { OpenAiModule } from '../open-ai/open-ai.module';
import { ClinicModelService } from './clinic/clinic-model.service';
import { ClinicController } from './clinic/clinic.controller';
import { ReviewModelService } from './review/review-model.service';
import { UserModule } from './user/user.module';
import { Clinic, ClinicSchema, Review, ReviewSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Clinic.name, schema: ClinicSchema }]),
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        OpenAiModule,
        UserModule,
    ],
    controllers: [ClinicController],
    providers: [ClinicModelService, ReviewModelService],
    exports: [ClinicModelService, ReviewModelService],
})
export class MongoModule {}
