import { CountryService } from './country.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from '@monorepo/type';
import { CountryController } from './country.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    ],
    controllers: [CountryController],
    providers: [CountryService],
    exports: [CountryService],
})
export class CountryModule {}
