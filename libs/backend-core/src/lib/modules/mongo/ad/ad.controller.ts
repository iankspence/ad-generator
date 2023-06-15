import { FindAdsByAccountIdDto, FindHookTextByAdIdDto } from '@monorepo/type';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdService } from './ad.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('ad')
export class AdController {
    constructor(private readonly adService: AdService) {}

    @UseGuards(JwtAuthGuard)
    @Post('find-ads-by-account-id')
    findAdsByAccountId(@Body() findAdsByAccountIdDto: FindAdsByAccountIdDto) {
        return this.adService.findAdsByAccountId(findAdsByAccountIdDto.accountId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('find-hook-text-by-ad-id')
    findHookTextByAdId(@Body() findHookTextByAdIdDto: FindHookTextByAdIdDto) {
        return this.adService.findHookTextByAdId(findHookTextByAdIdDto.adId);
    }
}
