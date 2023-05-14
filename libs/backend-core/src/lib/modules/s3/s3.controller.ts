import { Controller, Post, Body } from '@nestjs/common';
import { S3Service } from './s3.service';
import {AccountDocument} from "@monorepo/type";

@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}

    @Post('save-canvas')
    async saveCanvas(
        @Body('canvasName') canvasName: string,
        @Body('dataUrl') dataUrl: string,
        @Body('account') account: AccountDocument
        ) {
        return this.s3Service.saveCanvas(canvasName, dataUrl, account);
    }
}
