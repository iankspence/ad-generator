import { UserSignInService } from '../sign-in/user-sign-in.service';
import { User, UserDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserVerifyEmailService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly userSignInService: UserSignInService,
    ) {}

    async verifyEmail(verifyToken: string): Promise<{ message: string; token: string }> {
        const user = await this.findByVerificationToken(verifyToken);
        if (user) {
            await this.updateEmailVerificationStatus(user as UserDocument);
            const token = await this.userSignInService.generateToken(user);
            return { message: 'Email successfully verified', token };
        } else {
            throw new Error('Invalid verification token');
        }
    }

    async findByVerificationToken(token: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ emailVerificationToken: token }).exec();
    }

    async updateEmailVerificationStatus(user: UserDocument): Promise<UserDocument> {
        user.emailVerified = true;
        user.emailVerificationToken = null;
        return user.save();
    }
}
