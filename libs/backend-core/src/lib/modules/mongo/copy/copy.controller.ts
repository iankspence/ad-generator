import { CopyService } from './copy.service';
import { CopyDocument, UpdateCopyTextEditDto } from '@monorepo/type';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('copy')
export class CopyController {
    constructor(private readonly copyService: CopyService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-text-edit')
    async updateTextEdit(@Body() updateCopyTextEditDto: UpdateCopyTextEditDto): Promise<CopyDocument> {
        return await this.copyService.updateTextEdit(updateCopyTextEditDto.copy);
    }
}
