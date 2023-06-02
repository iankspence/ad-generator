import { ProvinceStateService } from './province-state.service';
import { ProvinceStateDocument } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';
import {
    FindProvinceStatesByCountryDto
} from '../../../../../../type/src/lib/dto/mongo/province-state/find-province-states-by-country.dto';

@Controller('province-state')
export class ProvinceStateController {
    constructor(private readonly provinceStateService: ProvinceStateService) {}

    @Post('find-province-states-by-country')
    async findProvinceStatesByCountry(@Body() findProvinceStateByCountryDto: FindProvinceStatesByCountryDto): Promise<ProvinceStateDocument[]> {
        return await this.provinceStateService.findProvinceStatesByCountry(findProvinceStateByCountryDto.country);
    }
}
