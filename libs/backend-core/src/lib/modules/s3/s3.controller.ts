import { Controller, Post, Body } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}

    @Post('canvas/:canvasName')
    async saveCanvas(
        @Body('canvasName') canvasName: string,
        @Body('dataUrl') dataUrl: string
        ) {
        return this.s3Service.saveCanvas(canvasName, dataUrl);
    }
}
