import { UserRegisterService } from './user-register.service';
import { UserRegisterDto } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserRegisterController {
    constructor(private readonly userRegisterService: UserRegisterService) {}

    @Post('register')
    async register(@Body() createUserDto: UserRegisterDto) {
        return await this.userRegisterService.register(createUserDto);
    }
}
