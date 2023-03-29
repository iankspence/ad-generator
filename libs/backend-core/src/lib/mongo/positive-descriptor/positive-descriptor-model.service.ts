import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PositiveDescriptor, PositiveDescriptorDocument } from './positive-descriptor.schema';
import uniqid from 'uniqid';

@Injectable()
export class PositiveDescriptorModelService {
    constructor(
        @InjectModel(PositiveDescriptor.name) private positiveDescriptorModel: Model<PositiveDescriptorDocument>,
    ) { }

    // Create a new positiveDescriptor
    async create(positiveDescriptor: Partial<PositiveDescriptor>): Promise<PositiveDescriptor> {
        positiveDescriptor.id = uniqid('positivedescriptor_')
        const createdPositiveDescriptor = new this.positiveDescriptorModel(positiveDescriptor);
        return createdPositiveDescriptor.save();
    }

    // Find a positiveDescriptor by its ID
    async findOneById(id: string): Promise<PositiveDescriptor> {
        return await this.positiveDescriptorModel.findOne({ id: id }).exec();
    }

    // Update a positiveDescriptor by its ID
    async updateOneById(id: string, update: Partial<PositiveDescriptor>): Promise<PositiveDescriptor | null> {
        return this.positiveDescriptorModel.findOneAndUpdate({ id: id }, update, { new: true }).exec();
    }

    // Delete a positiveDescriptor by its ID
    async deleteOneById(id: string): Promise<PositiveDescriptor | null> {
        return this.positiveDescriptorModel.findOneAndDelete({ id: id }).exec();
    }

    // Read all positiveDescriptors (optional: you might want to paginate this depending on your use case)
    async findAll(): Promise<PositiveDescriptor[]> {
        return this.positiveDescriptorModel.find().exec();
    }

    // Find all positiveDescriptors by their clinic ID
    async findAllByClinicId(clinicId: string): Promise<PositiveDescriptor[]> {
        return await this.positiveDescriptorModel.find({ clinicId: clinicId }).exec();
    }

    // Find all positiveDescriptors by their review ID
    async findAllByReviewId(reviewId: string): Promise<PositiveDescriptor[]> {
        return await this.positiveDescriptorModel.find({ reviewId: reviewId }).exec();
    }
}
