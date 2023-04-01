import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User, UserDocument, UserRegisterDto} from '@monorepo/type';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import { MailerService } from './mailer.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
                private readonly mailerService: MailerService,
    ) {}

    async register(createUserDto: UserRegisterDto): Promise<UserDocument> {
        const userWithDefaultRoles = {
            ...createUserDto,
            roles: createUserDto.roles || ['user'],
            emailVerificationToken: uuidv4(),
        };

        const user = await this.create(userWithDefaultRoles);
        await this.mailerService.sendVerificationEmail(user.email, user.emailVerificationToken);
        return user;
    }

    async create(userRegisterDto: UserRegisterDto): Promise<UserDocument> {
        const { password } = userRegisterDto;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = new this.userModel({
            ...userRegisterDto,
            password: hashedPassword,
        });

        return createdUser.save();
    }

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

    async verifyEmail(verifyToken: string): Promise<{ message: string, token: string }> {
        const user = await this.findByVerificationToken(verifyToken);

        if (user) {
            await this.updateEmailVerificationStatus(user as UserDocument);

            // Generate JWT for the user after email verification
            const payload = { email: user.email, sub: user._id };
            const token = this.jwtService.sign(payload);

            return { message: 'Email successfully verified', token };
        } else {
            throw new Error('Invalid verification token');
        }
    }

    async signIn(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }

    async findOne(username: string): Promise<UserDocument | undefined> {
        return this.userModel.findOne({ username });
    }

    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ email }).exec();
    }
}
