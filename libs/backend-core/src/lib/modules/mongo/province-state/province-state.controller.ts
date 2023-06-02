import { ProvinceStateService } from './province-state.service';
import { ProvinceStateDocument } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('province-state')
export class ProvinceStateController {
    constructor(private readonly provinceStateService: ProvinceStateService) {}

    @Post('find-province-states-by-country')
    async findProvinceStatesByCountry(@Body() dto: { country: string }): Promise<ProvinceStateDocument[]> {
        return await this.provinceStateService.findProvinceStatesByCountry(dto.country);
    }
}
