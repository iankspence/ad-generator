import { HookService } from './hook.service';
import { Hook, UpdateHookTextEditDto } from '@monorepo/type';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('hook')
export class HookController {
    constructor(private readonly hookService: HookService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-text-edit')
    async updateTextEdit(@Body() updateHookTextEditDto: UpdateHookTextEditDto): Promise<Hook> {
        return await this.hookService.updateTextEdit(updateHookTextEditDto.hook);
    }
}
