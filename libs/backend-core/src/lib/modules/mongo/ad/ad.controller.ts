import { FindAdsByAccountIdDto } from '@monorepo/type';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdService } from './ad.service';
import { RolesGuard } from '../../auth/roles.guard';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('ad')
export class AdController {
    constructor(private readonly adService: AdService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('find-ads-by-account-id')
    findAdsByAccountId(@Body() findAdsByAccountIdDto: FindAdsByAccountIdDto) {
        return this.adService.findAdsByAccountId(findAdsByAccountIdDto.accountId);
    }
}
