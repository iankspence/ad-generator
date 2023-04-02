import { MailerService } from './register/mailer.service';
import { User, UserDocument } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.findOneByEmail(email);
        if (user && (await user.comparePassword(password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async findByVerificationToken(token: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ emailVerificationToken: token }).exec();
    }

    async updateEmailVerificationStatus(user: UserDocument): Promise<UserDocument> {
        user.emailVerified = true;
        user.emailVerificationToken = null;
        return user.save();
    }

    async generateToken(user: any) {
        const payload = {
            _id: user._doc._id,
            clinicName: user._doc.clinicName,
            name: user._doc.name,
            phone: user._doc.phone,
            emailVerified: user._doc.emailVerified,
            email: user._doc.email,
            roles: user._doc.roles,
        };
        return this.jwtService.sign(payload);
    }

    async signIn(user: any): Promise<{ user: any; token: string }> {
        return {
            user: {
                _id: user._doc._id,
                clinicName: user._doc.clinicName,
                name: user._doc.name,
                phone: user._doc.phone,
                emailVerified: user._doc.emailVerified,
                email: user._doc.email,
                roles: user._doc.roles,
            },
            token: await this.generateToken(user),
        };
    }

    async verifyEmail(verifyToken: string): Promise<{ message: string; token: string }> {
        const user = await this.findByVerificationToken(verifyToken);
        if (user) {
            await this.updateEmailVerificationStatus(user as UserDocument);
            const token = await this.generateToken(user);
            return { message: 'Email successfully verified', token };
        } else {
            throw new Error('Invalid verification token');
        }
    }

    async findOne(username: string): Promise<UserDocument | undefined> {
        return this.userModel.findOne({ username });
    }

    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ email }).exec();
    }

    // async verifyJwt(token: string): Promise<any> {
    //     return this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET })
    // }
}
