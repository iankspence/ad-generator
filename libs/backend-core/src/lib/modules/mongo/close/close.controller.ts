import { CloseService } from './close.service';
import { CloseDocument, UpdateCloseTextEditDto } from '@monorepo/type';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('close')
export class CloseController {
    constructor(private readonly closeService: CloseService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-text-edit')
    async updateTextEdit(@Body() updateCloseTextEdit: UpdateCloseTextEditDto): Promise<CloseDocument> {
        return await this.closeService.updateTextEdit(updateCloseTextEdit.close);
    }
}
