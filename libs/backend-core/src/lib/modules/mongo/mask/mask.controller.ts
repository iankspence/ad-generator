import { MaskService } from './mask.service';
import { FindMasksByNamesDto, MaskDocument } from '@monorepo/type';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('mask')
export class MaskController {
    constructor(private readonly maskService: MaskService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('find-all-by-names')
    async findAllByNames(@Body() findMasksByNamesDto: FindMasksByNamesDto): Promise<MaskDocument[]> {
        return await this.maskService.findAllByNames(findMasksByNamesDto.maskNames);
    }
}

// @Post('upload-from-directory')
// async uploadMasksFromDirectory(@Body('directoryPath') directoryPath: string): Promise<void> {
//     await this.maskService.uploadMasksFromDirectory(directoryPath);
// }
