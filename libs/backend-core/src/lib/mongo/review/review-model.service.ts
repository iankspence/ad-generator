import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenAiService } from '../../open-ai/open-ai.service';
import { PositiveDescriptorModelService } from '../positive-descriptor/positive-descriptor-model.service';
import { ClaimModelService } from '../claim/claim-model.service';
import { Review, ReviewDocument } from './review.schema';
import uniqid from 'uniqid';
import { PositiveDescriptor, Claim } from '@monorepo/type';

@Injectable()
export class ReviewModelService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        private openAiService: OpenAiService,
        private positiveDescriptorModelService: PositiveDescriptorModelService,
        private claimModelService: ClaimModelService,
    ) { }

    // Create a new review
    async create(review: Partial<Review>): Promise<[Review, PositiveDescriptor, Claim[]]> {
        review.id = uniqid('review_')
        const createdReview = new this.reviewModel(review);

        const [responsePositiveDescriptorText, responseClaimArray] = await this.openAiService.createCompletion(review.reviewText)

        console.log('test 1 ')

        const newPositiveDescriptor = await this.positiveDescriptorModelService.create({
            clinicId: review.clinicId,
            reviewId: review.id,
            positiveDescriptorText: responsePositiveDescriptorText
        })

        console.log('test 2 ')

        let claims: Claim[] = [];
        for (let i = 0; i < responseClaimArray.length; i++) {
            claims = [...claims, {
                id: '',
                clinicId: review.clinicId,
                reviewId: review.id,
                positiveDescriptorId: newPositiveDescriptor.id,
                claimText: responseClaimArray[i]
            }]
        }

        console.log('here is the array of claims! ', responseClaimArray)

        console.log('here are the claims (within the service): ', claims)

        const newClaims = await this.claimModelService.createMany(claims)

        console.log('new claim response: ', newClaims)

        console.log('test 4 ')

        return [await createdReview.save(), newPositiveDescriptor, newClaims];
    }

    // Find a review by its ID
    async findOneById(id: string): Promise<Review> {
        return await this.reviewModel.findOne({ id: id }).exec();
    }

    // Update a review by its ID
    async updateOneById(id: string, update: Partial<Review>): Promise<Review | null> {
        return this.reviewModel.findOneAndUpdate({ id: id }, update, { new: true }).exec();
    }

    // Delete a review by its ID
    async deleteOneById(id: string): Promise<Review | null> {
        return this.reviewModel.findOneAndDelete({ id: id }).exec();
    }

    // Read all reviews (optional: you might want to paginate this depending on your use case)
    async findAll(): Promise<Review[]> {
        return this.reviewModel.find().exec();
    }

    // Find all reviews by their clinic ID
    async findAllByClinicId(clinicId: string): Promise<Review[]> {
        return await this.reviewModel.find({ clinicId: clinicId }).exec();
    }
}
