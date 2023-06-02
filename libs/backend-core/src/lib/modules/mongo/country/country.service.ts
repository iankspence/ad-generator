import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from '@monorepo/type';

@Injectable()
export class CountryService {
    constructor(@InjectModel(Country.name) private countryModel: Model<CountryDocument>) {}

    async bulkCreate(countries: Country[]): Promise<void> {
        await this.countryModel.insertMany(countries, { ordered: false });
    }

    async getCountries(): Promise<CountryDocument[]> {
        return await this.countryModel.find().exec();
    }
}
