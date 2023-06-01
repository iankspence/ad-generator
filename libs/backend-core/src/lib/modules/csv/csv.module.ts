import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { Module } from '@nestjs/common';
import { CountryModule } from '../mongo/country/country.module';
import { ProvinceStateModule } from '../mongo/province-state/province-state.module';
import { CityModule } from '../mongo/city/city.module';

@Module({
    imports: [CountryModule, ProvinceStateModule, CityModule],
    controllers: [CsvController],
    providers: [CsvService],
})
export class CsvModule {}
