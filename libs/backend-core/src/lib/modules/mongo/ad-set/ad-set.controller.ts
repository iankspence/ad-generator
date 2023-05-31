import { CreateAdSetForPdfDeliveryDto, DeleteAdSetAndAdsAndCardsDto } from '@monorepo/type';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdSetService } from './ad-set.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('ad-set')
export class AdSetController {
    constructor(private readonly adSetService: AdSetService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('create-ad-set-for-pdf-delivery')
    createAdSetForPdfDelivery(@Body() adSetData: CreateAdSetForPdfDeliveryDto) {
        return this.adSetService.createAdSetForPdfDelivery(adSetData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'content-manager')
    @Post('delete-ad-set-and-ads-and-cards')
    deleteAdSetAndAdsAndCards(@Body() deleteAdSetAndAdsAndCardsDto: DeleteAdSetAndAdsAndCardsDto) {
        return this.adSetService.deleteAdsetAndAdsAndCards(deleteAdSetAndAdsAndCardsDto.adSetId);
    }
}
