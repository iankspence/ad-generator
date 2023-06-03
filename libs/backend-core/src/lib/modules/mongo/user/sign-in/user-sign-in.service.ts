import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../../../logger/logger.service';

@Injectable()
export class UserSignInService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly logger: LoggerService,
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

        this.logger.debug(`Generating token for user: ${user._doc.email}`);
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });
        this.logger.verbose(`Generated token for user: ${user._doc.email}`);

        return token;
    }

    async signIn(user: any): Promise<{ user: any; token: string }> {
        this.logger.log(`Sign in attempt for user: ${user._doc.email}`);

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
