import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from '@monorepo/type';
import { UserService } from './user.service';

@Controller('register')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async register(@Body() createUserDto: UserRegisterDto) {
        return this.userService.create(createUserDto);
    }
}
