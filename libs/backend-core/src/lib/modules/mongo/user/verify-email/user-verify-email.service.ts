import { UserSignInService } from '../sign-in/user-sign-in.service';
import { AccountDocument, User, UserDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserActionService } from '../../user-action/user-action.service';
import { Request } from 'express';
import { LoggerService } from '../../../logger/logger.service';

@Injectable()
export class UserVerifyEmailService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(User.name) private readonly accountModel: Model<AccountDocument>,
        private readonly userSignInService: UserSignInService,
        private readonly userActionService: UserActionService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext('UserVerifyEmailService');
    }

    async verifyEmail(emailVerificationToken: string, req: Request): Promise<{ message: string }> {
        try {
            const user = await this.findByVerificationToken(emailVerificationToken);
            const account = await this.accountModel.findOne({ userId: user._id }).exec();

            if (user) {
                await this.updateEmailVerificationStatus(user as UserDocument);

                await this.userActionService.createUserAction({
                    userId: user._id.toString(),
                    accountId: account._id.toString(),
                    context: 'UserVerifyEmailService',
                    dateTime: new Date(),
                    action: 'verify-email',
                }, req);

                this.logger.log(`User: ${user._id} and account: ${account._id} have been verified.`);
                return { message: 'Email successfully verified' };
            } else {
                this.logger.error(`Invalid verification token: ${emailVerificationToken}`);
                return { message: 'Invalid verification token' };
            }

        } catch (error) {
            this.logger.error(error);
            return { message: 'Invalid verification token' };
        }
    }

    async findByVerificationToken(token: string): Promise<UserDocument | null> {
        try {
            return await this.userModel.findOne({ emailVerificationToken: token }).exec();
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }

    async updateEmailVerificationStatus(user: UserDocument): Promise<UserDocument> {
        try {
            user.emailVerified = true;
            user.emailVerificationToken = null;
            return user.save();
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }
}
