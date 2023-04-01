import {Body, Controller, Post, UseGuards, Request, Get} from '@nestjs/common';
import {SignInDto, UserRegisterDto} from '@monorepo/type';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import {LocalAuthGuard} from "../../auth/local-auth.guard";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller()
// @UseGuards(AuthGuard('jwt'), RolesGuard) // Add AuthGuard before RolesGuard
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: UserRegisterDto) {
        return await this.userService.register(createUserDto);
    }

    @Post('sign-in')
    @UseGuards(LocalAuthGuard)
    async signIn(@Request() req) {
        return this.userService.signIn(req.user);
    }

    @Post('account')
    @UseGuards(JwtAuthGuard)
    getAccount(@Request() req) {
        return req.user;
    }

    @Post('verify-email')
    async verifyEmail(@Body('token') token: string): Promise<{ message: string }> {
        return this.userService.verifyEmail(token);
    }
}
