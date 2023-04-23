import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';
import {
    Review,
    ReviewSchema,
    Hook,
    HookSchema,
    Claim,
    ClaimSchema,
    Copy,
    CopySchema,
    Close,
    CloseSchema,
} from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        MongooseModule.forFeature([{ name: Hook.name, schema: HookSchema }]),
        MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
        MongooseModule.forFeature([{ name: Copy.name, schema: CopySchema }]),
        MongooseModule.forFeature([{ name: Close.name, schema: CloseSchema }]),
    ],
    controllers: [OpenAiController],
    providers: [OpenAiService],
    exports: [OpenAiService],
})
export class OpenAiModule {}
