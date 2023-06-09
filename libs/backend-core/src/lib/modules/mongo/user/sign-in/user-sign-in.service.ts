import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../../../logger/logger.service';
import { CustomerService } from '../../customer/customer.service';

@Injectable()
export class UserSignInService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly logger: LoggerService,
        private readonly customerService: CustomerService,
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

        const token = this.jwtService.sign(payload, { expiresIn: '1h' });
        this.logger.log(`Generated token for user: ${user._doc.email}`);
        return token;
    }

    async signIn(user: any): Promise<{ user: any; token: string }> {

        if (!user._doc.isActive) {
            const { active } = await this.customerService.findCustomerSubscriptionStatusByUserId(user._doc._id);
            if (!active) {
                this.logger.warn(`User ${user._doc._id} has been deactivated and you do not have an active subscription - denying sign-in.`);
                return null;
            }
        }

        const result = {
            user: {
                _id: user._doc._id,
                emailVerified: user._doc.emailVerified,
                email: user._doc.email,
                roles: user._doc.roles,
            },
            token: await this.generateToken(user),
        };

        if (result.token) {
            this.logger.log(`Sign in successful for user: ${user._doc.email}`);
        } else {
            this.logger.error(`Sign in failed for user: ${user._doc.email}`, '');
        }

        return result;
    }
}
