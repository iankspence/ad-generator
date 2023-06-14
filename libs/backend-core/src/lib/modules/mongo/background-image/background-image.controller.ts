import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BackgroundImageService } from './background-image.service';
import { BackgroundImageDocument, UploadBackgroundImageDto, UploadedFileInterface } from '@monorepo/type';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoggerService } from '../../logger/logger.service';

@Controller('background-image')
export class BackgroundImageController {
    constructor(private readonly backgroundImageService: BackgroundImageService,
                private readonly logger: LoggerService
    ) {
        this.logger.setContext('BackgroundImageController');
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Get('get-background-images')
    async getBackgroundImages(): Promise<BackgroundImageDocument[]> {
        return await this.backgroundImageService.getBackgroundImages();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('upload')
    @UseInterceptors(FileInterceptor('backgroundImage'))
    async uploadImage(@UploadedFile() backgroundImage: UploadedFileInterface, @Body() uploadBackgroundImageDto: UploadBackgroundImageDto): Promise<void> {
        await this.backgroundImageService.uploadImage(backgroundImage, uploadBackgroundImageDto);
    }
}

// @Post('upload-from-directory')
// async uploadImagesFromDirectory(@Body('directoryPath') directoryPath: string): Promise<void> {
//     await this.backgroundImageService.uploadImagesFromDirectory(directoryPath);
// }
