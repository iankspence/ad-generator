import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument, FindLatLonByCityAndProvinceStateDto } from '@monorepo/type';

@Injectable()
export class CityService {
    constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

    async bulkCreate(cities: City[]): Promise<void> {
        await this.cityModel.insertMany(cities, { ordered: false });
    }

    async findCitiesByProvinceState(provinceState: string): Promise<CityDocument[]> {
        return this.cityModel.find({ provinceState }).exec();
    }

    findLatLonByCityAndProvinceState(findLatLonByCityAndProvinceStateDto: FindLatLonByCityAndProvinceStateDto): Promise<{lat: number, lon: number}> {
        return this.cityModel.findOne({ name: findLatLonByCityAndProvinceStateDto.city, provinceState: findLatLonByCityAndProvinceStateDto.provinceState }).exec().then((city: CityDocument) => {
            return {
                lat: city.latitude,
                lon: city.longitude
            }
        });
    }
}
