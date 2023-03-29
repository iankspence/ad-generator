import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenAiModule } from '../open-ai/open-ai.module';
import { AdSetModelService } from './ad-set/ad-set-model.service';
import { AdSetController } from './ad-set/ad-set.controller';
import { AdSet, AdSetSchema } from './ad-set/ad-set.schema';
import { ClaimModelService } from './claim/claim-model.service';
import { ClaimController } from './claim/claim.controller';
import { Claim, ClaimSchema } from './claim/claim.schema';
import { ClinicModelService } from './clinic/clinic-model.service';
import { ClinicController } from './clinic/clinic.controller';
import { Clinic, ClinicSchema } from './clinic/clinic.schema';
import { PositiveDescriptorModelService } from './positive-descriptor/positive-descriptor-model.service';
import { PositiveDescriptorController } from './positive-descriptor/positive-descriptor.controller';
import { PositiveDescriptor, PositiveDescriptorSchema } from './positive-descriptor/positive-descriptor.schema';
import { ReviewModelService } from './review/review-model.service';
import { ReviewController } from './review/review.controller';
import { Review, ReviewSchema } from './review/review.schema';

@Module({
    imports: [
        OpenAiModule,
        MongooseModule.forFeature([{ name: Clinic.name, schema: ClinicSchema }]),
        MongooseModule.forFeature([{ name: AdSet.name, schema: AdSetSchema }]),
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        MongooseModule.forFeature([{ name: PositiveDescriptor.name, schema: PositiveDescriptorSchema }]),
        MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
    ],
    controllers: [
        ClinicController,
        AdSetController,
        ReviewController,
        PositiveDescriptorController,
        ClaimController
    ],
    providers: [
        ClinicModelService,
        AdSetModelService,
        ReviewModelService,
        PositiveDescriptorModelService,
        ClaimModelService],
})

export class MongoModule { }
