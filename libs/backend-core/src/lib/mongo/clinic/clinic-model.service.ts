import { Clinic, ClinicDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClinicModelService {
    constructor(@InjectModel(Clinic.name) private clinicModel: Model<ClinicDocument>) {}

    // Create a new clinic
    async create(clinic: Partial<Clinic>): Promise<Clinic> {
        const createdClinic = new this.clinicModel(clinic);
        return createdClinic.save();
    }

    async findOneById(id: string): Promise<Clinic> {
        return await this.clinicModel.findOne({ id: id }).exec();
    }

    // Update a clinic by its ID
    async updateOneById(id: string, update: Partial<Clinic>): Promise<Clinic | null> {
        return this.clinicModel.findOneAndUpdate({ id: id }, update, { new: true }).exec();
    }

    // Delete a clinic by its ID
    async deleteOneById(id: string): Promise<Clinic | null> {
        return this.clinicModel.findOneAndDelete({ id: id }).exec();
    }

    // Read all clinics (optional: you might want to paginate this depending on your use case)
    async findAll(): Promise<Clinic[]> {
        return this.clinicModel.find().exec();
    }
}
