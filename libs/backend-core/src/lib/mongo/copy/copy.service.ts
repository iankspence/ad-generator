import { Copy, CopyDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CopyService {
    constructor(@InjectModel(Copy.name) private readonly copyModel: Model<CopyDocument>) {}

    async createCopy(copy: Partial<Copy>): Promise<Copy> {
        const createdCopy = new this.copyModel(copy);
        return await createdCopy.save();
    }

    async getCopiesByReviewId(reviewId: string): Promise<Copy[]> {
        return await this.copyModel.find({ reviewId }).exec();
    }
}
