import { AccountModelService } from '../../account/account-model.service';
import { UserMailerService } from '../user-mailer.service';
import { User, UserDocument, RegisterUserDto } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CustomerService } from '../../customer/customer.service';

@Injectable()
export class UserRegisterService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly accountModelService: AccountModelService,
        private readonly userMailerService: UserMailerService,
        private readonly customerService: CustomerService,
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<UserDocument> {

        const user = await this.create({
            companyName: registerUserDto.companyName,
            email: registerUserDto.email,
            password: registerUserDto.password,
            roles: registerUserDto.roles || ['client'],
            emailVerificationToken: uuidv4(),
        });

        await this.userMailerService.sendVerificationEmail(user.email, user.emailVerificationToken);

        const account = await this.accountModelService.create({
            userId: user._id.toString(),
            companyName: user.companyName,
            country: registerUserDto.country,
            provinceState: registerUserDto.provinceState,
            city: registerUserDto.city,
            managerUserId: null,
        });

        await this.customerService.create(user._id.toString(), account._id.toString());

        return user;
    }

    async create(userRegisterDto: Partial<User>): Promise<UserDocument> {
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
