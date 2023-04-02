import { UserMailerService } from '../user-mailer.service';
import { ResetPasswordDto, User, UserDocument } from '@monorepo/type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserForgotPasswordService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly userMailerService: UserMailerService,
    ) {}

    async sendResetPasswordEmail(email: string): Promise<{ message: string }> {
        const user = await this.findByEmail(email);

        if (!user) {
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

        // Find the user by the token
        const user = await this.userModel.findOne({ resetPasswordToken: token });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Update the user's password
        user.password = await bcrypt.hash(newPassword, 10);

        // Clear the token
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return { message: 'Password successfully reset' };
    }
}
