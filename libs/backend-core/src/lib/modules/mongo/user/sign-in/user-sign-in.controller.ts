import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../../../auth/local-auth.guard';
import { UserSignInService } from './user-sign-in.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserSignInController {
    constructor(private readonly userSignInService: UserSignInService) {}
    @Post('sign-in')
    @UseGuards(LocalAuthGuard)
    async signIn(@Request() req) {
        return this.userSignInService.signIn(req.user);
    }
    @Post('jwt')
    @UseGuards(JwtAuthGuard)
    getAccount(@Request() req) {
        return req.user;
    }
}
