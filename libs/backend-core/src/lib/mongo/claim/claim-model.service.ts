import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim, ClaimDocument } from './claim.schema';
import uniqid from 'uniqid';

@Injectable()
export class ClaimModelService {
    constructor(
        @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
    ) { }

    // Create a new claim
    async create(claim: Partial<Claim>): Promise<Claim> {
        claim.id = uniqid('claim_')
        const createdClaim = new this.claimModel(claim);
        return createdClaim.save();
    }

    async createMany(claims: Partial<Claim>[]): Promise<Claim[]> {
        for (const claim of claims) {
            claim.id = uniqid('claim_')
        }
        return this.claimModel.insertMany(claims);
    }

    async findOneById(id: string): Promise<Claim> {
        return await this.claimModel.findOne({ id: id }).exec();
    }

    // Update a claim by its ID
    async updateOneById(id: string, update: Partial<Claim>): Promise<Claim | null> {
        return this.claimModel.findOneAndUpdate({ id: id }, update, { new: true }).exec();
    }

    // Delete a claim by its ID
    async deleteOneById(id: string): Promise<Claim | null> {
        return this.claimModel.findOneAndDelete({ id: id }).exec();
    }

    // Read all claims (optional: you might want to paginate this depending on your use case)
    async findAll(): Promise<Claim[]> {
        return this.claimModel.find().exec();
    }

    // Find all claims by their clinic ID
    async findAllByClinicId(clinicId: string): Promise<Claim[]> {
        return await this.claimModel.find({ clinicId: clinicId }).exec();
    }

    // Find all claims by their review ID
    async findAllByReviewId(reviewId: string): Promise<Claim[]> {
        return await this.claimModel.find({ reviewId: reviewId }).exec();
    }

    // Find all claims by their positiveDescriptor ID
    async findAllByPositiveDescriptorId(positiveDescriptorId: string): Promise<Claim[]> {
        return await this.claimModel.find({ positiveDescriptorId: positiveDescriptorId }).exec();
    }
}
