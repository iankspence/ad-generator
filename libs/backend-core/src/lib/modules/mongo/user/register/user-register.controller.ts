import { UserRegisterService } from './user-register.service';
import { DeactivateUserDto, ReactivateUserDto, RegisterUserDto } from '@monorepo/type';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';
import { Request } from 'express';

@Controller('user')
export class UserRegisterController {
    constructor(private readonly userRegisterService: UserRegisterService) {}
    @Post('register')
    async register(@Body() createUserDto: RegisterUserDto, @Req() req: Request) {
        return await this.userRegisterService.register(createUserDto, req);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('client')
    @Post('deactivate')
    async deactivate(@Body() deactivateUserDto: DeactivateUserDto) {
        return await this.userRegisterService.deactivate(deactivateUserDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('client')
    @Post('reactivate')
    async reactivate(@Body() reactivateUserDto: ReactivateUserDto) {
        return await this.userRegisterService.reactivate(reactivateUserDto);
    }
}

