import { Controller, Get, UseGuards } from '@nestjs/common';
import { BackgroundImageService } from './background-image.service';
import { BackgroundImageDocument } from '@monorepo/type';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('background-image')
export class BackgroundImageController {
    constructor(private readonly backgroundImageService: BackgroundImageService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Get('get-background-images')
    async getBackgroundImages(): Promise<BackgroundImageDocument[]> {
        return await this.backgroundImageService.getBackgroundImages();
    }
}

// @Post('upload-from-directory')
// async uploadImagesFromDirectory(@Body('directoryPath') directoryPath: string): Promise<void> {
//     await this.backgroundImageService.uploadImagesFromDirectory(directoryPath);
// }
