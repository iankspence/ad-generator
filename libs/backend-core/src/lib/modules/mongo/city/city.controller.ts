import { CityService } from './city.service';
import { CityDocument, FindCitiesByProvinceStateDto } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Post('find-cities-by-province-state')
    async findCitiesByProvinceState(@Body() findCitiesByProvinceStateDto: FindCitiesByProvinceStateDto ): Promise<CityDocument[]> {
        return await this.cityService.findCitiesByProvinceState(findCitiesByProvinceStateDto.provinceState);
    }
}
