import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserSignInService {
    constructor(private readonly jwtService: JwtService) {}

    async generateToken(user: any) {
        const payload = {
            _id: user._doc._id,
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
                emailVerified: user._doc.emailVerified,
                email: user._doc.email,
                roles: user._doc.roles,
            },
            token: await this.generateToken(user),
        };
    }
}
