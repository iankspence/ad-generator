import { MaskService } from './mask.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('mask')
export class MaskController {
    constructor(private readonly maskService: MaskService) {}

    @Post('upload-from-directory')
    async uploadMasksFromDirectory(@Body('directoryPath') directoryPath: string): Promise<void> {
        await this.maskService.uploadMasksFromDirectory(directoryPath);
    }
}
