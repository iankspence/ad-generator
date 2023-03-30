import {Body, Controller, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import {SignInDto, UserRegisterDto} from '@monorepo/type';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common'; // Import the Req decorator

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
