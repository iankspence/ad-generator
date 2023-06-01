import { CountryService } from './country.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from '@monorepo/type';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    ],
    providers: [CountryService],
    exports: [CountryService],
})
export class CountryModule {}
