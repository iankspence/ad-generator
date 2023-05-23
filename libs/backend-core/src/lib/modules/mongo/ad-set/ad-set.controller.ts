import { CreateAdSetForPdfDeliveryDto } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';
import { AdSetService } from './ad-set.service';

@Controller('ad-set')
export class AdSetController {
    constructor(private readonly adSetService: AdSetService) {}

    @Post('create-ad-set-for-pdf-delivery')
    createAdSetForPdfDelivery(@Body() adSetData: CreateAdSetForPdfDeliveryDto) {
        return this.adSetService.createAdSetForPdfDelivery(adSetData);
    }
}
