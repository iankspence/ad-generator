import { UserMailerService } from '../user-mailer.service';
import { User, UserDocument, UserRegisterDto } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRegisterService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly userMailerService: UserMailerService,
    ) {}

    async register(createUserDto: UserRegisterDto): Promise<UserDocument> {
        const userWithDefaultRoles = {
            ...createUserDto,
            roles: createUserDto.roles || ['user'],
            emailVerificationToken: uuidv4(),
        };

        const user = await this.create(userWithDefaultRoles);
        await this.userMailerService.sendVerificationEmail(user.email, user.emailVerificationToken);
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
}
