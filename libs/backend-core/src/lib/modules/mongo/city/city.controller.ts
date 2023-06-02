import { CityService } from './city.service';
import { CityDocument } from '@monorepo/type';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Post('find-cities-by-province-state')
    async findCitiesByProvinceState(@Body() dto: { provinceState: string } ): Promise<CityDocument[]> {
        return await this.cityService.findCitiesByProvinceState(dto.provinceState);
    }
}
