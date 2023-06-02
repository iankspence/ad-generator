import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProvinceState, ProvinceStateDocument } from '@monorepo/type';

@Injectable()
export class ProvinceStateService {
    constructor(@InjectModel(ProvinceState.name) private provinceStateModel: Model<ProvinceStateDocument>) {}

    async bulkCreate(provinceStates: ProvinceState[]): Promise<void> {
        await this.provinceStateModel.insertMany(provinceStates, { ordered: false });
    }

    async findProvinceStatesByCountry(country: string): Promise<ProvinceStateDocument[]> {
        return this.provinceStateModel.find({ countryName: country }).exec();
    }
}
