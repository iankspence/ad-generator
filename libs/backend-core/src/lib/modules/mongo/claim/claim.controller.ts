import { ClaimService } from './claim.service';
import { Claim, UpdateClaimTextEditDto } from '@monorepo/type';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('claim')
export class ClaimController {
    constructor(private readonly claimService: ClaimService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('update-text-edit')
    async updateTextEdit(@Body() updateClaimTextEditDto: UpdateClaimTextEditDto): Promise<Claim> {
        return await this.claimService.updateTextEdit(updateClaimTextEditDto.claim);
    }
}
