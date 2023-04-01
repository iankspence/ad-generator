import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {SignInDto, UserRegisterDto} from '@monorepo/type';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
// @UseGuards(AuthGuard('jwt'), RolesGuard) // Add AuthGuard before RolesGuard
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: UserRegisterDto) {
        return await this.userService.register(createUserDto);
    }

    @Post('sign-in')
    @UseGuards(AuthGuard('local'))
    async signIn(@Body() body: SignInDto) {
        const token = await this.userService.signIn(body.email, body.password);
        return { token };
    }

    @Post('verify-email')
    async verifyEmail(@Body('token') token: string): Promise<{ message: string }> {
        console.log('verifyEmail (controller):', token);
        return this.userService.verifyEmail(token);
    }
}
