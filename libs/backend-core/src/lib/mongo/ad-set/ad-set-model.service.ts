import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdSet, AdSetDocument } from './ad-set.schema';

@Injectable()
export class AdSetModelService {
    constructor(
        @InjectModel(AdSet.name) private adSetModel: Model<AdSetDocument>,
    ) { }

    // Create a new ad set
    async create(adSet: Partial<AdSet>): Promise<AdSet> {
        const createdAdSet = new this.adSetModel(adSet);
        return createdAdSet.save();
    }

    // Find an ad set by its ID
    async findOneById(id: string): Promise<AdSet> {
        return await this.adSetModel.findOne({ id: id }).exec();
    }

    // Update an ad set by its ID
    async updateOneById(id: string, update: Partial<AdSet>): Promise<AdSet | null> {
        return this.adSetModel.findOneAndUpdate({ id: id }, update, { new: true }).exec();
    }

    // Delete an ad set by its ID
    async deleteOneById(id: string): Promise<AdSet | null> {
        return this.adSetModel.findOneAndDelete({ id: id }).exec();
    }

    // Read all ad sets (optional: you might want to paginate this depending on your use case)
    async findAll(): Promise<AdSet[]> {
        return this.adSetModel.find().exec();
    }

    // Find all ad sets by their clinic ID
    async findAllByClinicId(clinicId: string): Promise<AdSet[]> {
        return await this.adSetModel.find({ clinicId: clinicId }).exec();
    }
}
