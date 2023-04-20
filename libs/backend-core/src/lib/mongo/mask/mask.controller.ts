import { MaskService } from './mask.service';
import { MaskDocument } from '@monorepo/type';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('mask')
export class MaskController {
    constructor(private readonly maskService: MaskService) {}

    @Post('upload-from-directory')
    async uploadMasksFromDirectory(@Body('directoryPath') directoryPath: string): Promise<void> {
        await this.maskService.uploadMasksFromDirectory(directoryPath);
    }

    @Post('find-all-by-names')
    async findAllByNames(@Body('maskNames') maskNames: string[]): Promise<MaskDocument[]> {
        return await this.maskService.findAllByNames(maskNames);
    }
}
