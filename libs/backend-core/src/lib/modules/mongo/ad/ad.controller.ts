import { Controller, Get, Param } from '@nestjs/common';
import { AdService } from './ad.service';

@Controller('ad')
export class AdController {
    constructor(private readonly adService: AdService) {}

    @Get('get-ads-by-account-id/:accountId')
    getAdsByAccountId(@Param('accountId') accountId: string) {
        return this.adService.getAdsByAccountId(accountId);
    }
}
