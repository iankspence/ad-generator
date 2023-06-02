import { CountryService } from './country.service';
import { CountryDocument } from '@monorepo/type';
import { Controller, Get } from '@nestjs/common';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Get('get-countries')
    async getCountries(): Promise<CountryDocument[]> {
        return await this.countryService.getCountries();
    }
}
