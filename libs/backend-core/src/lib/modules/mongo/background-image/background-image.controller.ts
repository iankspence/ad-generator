import { Controller, Get, Post, Body } from '@nestjs/common';
import { BackgroundImageService } from './background-image.service';
import { BackgroundImageDocument } from '@monorepo/type';

@Controller('background-image')
export class BackgroundImageController {
    constructor(private readonly backgroundImageService: BackgroundImageService) {}

    @Post('upload-from-directory')
    async uploadImagesFromDirectory(@Body('directoryPath') directoryPath: string): Promise<void> {
        await this.backgroundImageService.uploadImagesFromDirectory(directoryPath);
    }

    @Get('get-background-images')
    async getBackgroundImages(): Promise<BackgroundImageDocument[]> {
        return await this.backgroundImageService.getBackgroundImages();
    }
}
