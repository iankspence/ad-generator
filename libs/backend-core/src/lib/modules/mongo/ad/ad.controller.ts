import { Controller, Get, Param, Body, HttpCode, Post, Delete } from '@nestjs/common';
import { AdService } from './ad.service';

@Controller('ad')
export class AdController {
    constructor(private readonly adService: AdService) {}

    @Get('get-ads-by-account-id/:accountId')
    getAdsByAccountId(@Param('accountId') accountId: string) {
        return this.adService.getAdsByAccountId(accountId);
    }

    @Post('copy')
    @HttpCode(200)
    async copyAd(@Body('adId') adId: string) {
        return this.adService.copyAd(adId);
    }

    @Delete('delete/:id')
    @HttpCode(204)
    async deleteAd(@Param('id') adId: string) {
        return this.adService.deleteAd(adId);
    }

}
