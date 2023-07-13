import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../../../logger/logger.service';
import { CustomerService } from '../../customer/customer.service';
import { UserActionService } from '../../user-action/user-action.service';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from '@monorepo/type';
import { Model } from 'mongoose';

@Injectable()
export class UserSignInService {
    constructor(
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
        private readonly jwtService: JwtService,
        private readonly logger: LoggerService,
        private readonly customerService: CustomerService,
        private readonly userActionService: UserActionService,
    ) {
        this.logger.setContext('UserSignInService');
    }

    async generateToken(user: any) {
        const payload = {
            _id: user._doc._id,
            emailVerified: user._doc.emailVerified,
            email: user._doc.email,
            roles: user._doc.roles,
        };

        const token = this.jwtService.sign(payload, { expiresIn: '7d' });
        this.logger.log(`Generated token for user: ${user._doc.email}`);
        return token;
    }

    async signIn(user: any): Promise<{ user: any; token: string }> {

        if (!user._doc.isActive) {
            this.logger.warn(`User ${user._doc._id} has been deactivated - sign-in failed.`);
            return null;
        }

        const result = {
            user: {
                _id: user._doc._id,
                emailVerified: user._doc.emailVerified,
                email: user._doc.email,
                roles: user._doc.roles,
                isActive: user._doc.isActive,
            },
            token: await this.generateToken(user),
        };

        const account = await this.accountModel.findOne({ userId: user._doc._id.toString() }).exec();

        if (account) {
            this.logger.verbose(`Account found for user: ${user._doc.email} - creating user action.`);
            await this.userActionService.createUserAction({
                userId: user._doc._id.toString(),
                accountId: account._id.toString() || '',
                context: 'UserSignInService',
                dateTime: new Date(),
                action: 'sign-in',
                managerUserId: account.managerUserId || '',
            });
        }

        if (result.token) {
            this.logger.log(`Sign in successful for user: ${user._doc.email}`);
        } else {
            this.logger.error(`Sign in failed for user: ${user._doc.email}`, '');
        }
        return result;
    }
}
