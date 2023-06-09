import { UserRegisterService } from './user-register.service';
import { DeactivateUserDto, RegisterUserDto } from '@monorepo/type';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';

@Controller('user')
export class UserRegisterController {
    constructor(private readonly userRegisterService: UserRegisterService) {}
    @Post('register')
    async register(@Body() createUserDto: RegisterUserDto) {
        return await this.userRegisterService.register(createUserDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('client')
    @Post('deactivate')
    async deactivate(@Body() deactivateUserDto: DeactivateUserDto) {
        return await this.userRegisterService.deactivate(deactivateUserDto);
    }
}
