import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey', // Replace with your own secret key
        });
    }

    async validate(payload: any) {
        const user = await this.authService.validateByPayload(payload.sub);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
