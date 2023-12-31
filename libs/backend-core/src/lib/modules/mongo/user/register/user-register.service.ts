import { AccountModelService } from '../../account/account-model.service';
import { UserMailerService } from '../user-mailer.service';
import { User, UserDocument, RegisterUserDto, DeactivateUserDto } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CustomerService } from '../../customer/customer.service';
import { LoggerService } from '../../../logger/logger.service';
import { UserActionService } from '../../user-action/user-action.service';
import { Request } from 'express';
import geoTz from 'geo-tz';

@Injectable()
export class UserRegisterService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly accountModelService: AccountModelService,
        private readonly userMailerService: UserMailerService,
        private readonly customerService: CustomerService,
        private readonly userActionService: UserActionService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext('UserRegisterService');
    }

    async register(registerUserDto: RegisterUserDto, req: Request): Promise<UserDocument> {
        const user = await this.create({
            companyName: registerUserDto.companyName,
            email: registerUserDto.email,
            password: registerUserDto.password,
            roles: registerUserDto.roles || ['client'],
            emailVerificationToken: uuidv4(),
            isActive: true
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

        await this.userActionService.createUserAction({
            userId: user._id.toString(),
            accountId: account._id.toString(),
            context: 'UserRegisterService',
            dateTime: new Date(),
            action: 'register',
        }, req);

        this.logger.log(`User: ${user._id} and account: ${account._id} have been created.`);

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

    async deactivate(deactivateUserDto: DeactivateUserDto): Promise<UserDocument> {
        const { userId, accountId } = deactivateUserDto;

        const user = await this.userModel.findOneAndUpdate(
            { _id: userId },
            { isActive: false },
            { new: true }
        );

        await this.accountModelService.deactivateAccount(accountId)

        this.logger.log(`User: ${userId} and account: ${accountId} have been deactivated.`);

        return user;
    }

    async reactivate(reactivateUserDto): Promise<UserDocument> {
        const { userId, accountId } = reactivateUserDto;

        const user = await this.userModel.findOneAndUpdate(
            { _id: userId },
            { isActive: true },
            { new: true },
        );
        await this.accountModelService.reactivateAccount(accountId)

        this.logger.log(`User: ${userId} and account: ${accountId} have been reactivated.`);
        return user;
    }
}
