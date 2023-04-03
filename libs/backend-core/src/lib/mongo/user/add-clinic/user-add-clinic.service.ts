import { User, UserDocument } from '@monorepo/type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserAddClinicService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async addClinicToUser(userId: string, clinicId: string): Promise<User> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.clinicIds.push(new Types.ObjectId(clinicId));

        return user.save();
    }
}
