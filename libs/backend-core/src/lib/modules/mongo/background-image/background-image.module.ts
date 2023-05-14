import { BackgroundImageController } from './background-image.controller';
import { BackgroundImageService } from './background-image.service';
import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {BackgroundImage, BackgroundImageSchema} from "@monorepo/type";

@Module({
    imports: [MongooseModule.forFeature([{ name: BackgroundImage.name, schema: BackgroundImageSchema }])],
    controllers: [BackgroundImageController],
    providers: [BackgroundImageService],
})
export class BackgroundImageModule {}
