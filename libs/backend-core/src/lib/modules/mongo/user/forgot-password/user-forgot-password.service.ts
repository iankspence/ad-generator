import { UserMailerService } from '../user-mailer.service';
import { ResetPasswordDto, User, UserDocument } from '@monorepo/type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from '../../../logger/logger.service';

@Injectable()
export class UserForgotPasswordService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly userMailerService: UserMailerService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext('UserForgotPasswordService');
    }

    async sendResetPasswordEmail(email: string): Promise<{ message: string }> {
        const user = await this.findByEmail(email);
        this.logger.log(`User: ${user._id} has requested a password reset`);

        if (!user) {
            this.logger.error(`User: ${user._id} not found`);
            throw new Error('Email not found');
        }


        const resetToken = uuidv4();
        await this.updateResetToken(user, resetToken);
        await this.userMailerService.sendResetPasswordEmail(email, resetToken); // Send email using UserMailerService

        return { message: 'Reset password email sent' };
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ email }).exec();
    }

    async updateResetToken(user: UserDocument, token: string): Promise<UserDocument> {
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiration
        return user.save();
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        const { token, newPassword } = resetPasswordDto;
        const user = await this.userModel.findOne({ resetPasswordToken: token });

        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        this.logger.log(`User: ${user._id} has successfully reset their password`);

        return { message: 'Password successfully reset' };
    }
}
