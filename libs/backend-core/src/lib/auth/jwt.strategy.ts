import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        return {
            _id: payload._id,
            email: payload.email,
            clinicName: payload.clinicName,
            name: payload.name,
            phone: payload.phone,
            emailVerified: payload.emailVerified,
            roles: payload.roles,
            clinicIds: payload.clinicIds,
        };
    }
}
