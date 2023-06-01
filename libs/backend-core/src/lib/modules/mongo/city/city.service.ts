import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from '@monorepo/type';

@Injectable()
export class CityService {
    constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

    async bulkCreate(cities: City[]): Promise<void> {
        await this.cityModel.insertMany(cities, { ordered: false });
    }
}
