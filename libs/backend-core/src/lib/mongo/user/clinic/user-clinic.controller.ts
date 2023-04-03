import { UserClinicService } from './user-clinic.service';
import { Clinic, User } from '@monorepo/type';
import { Controller, Put, Param, Get } from '@nestjs/common';
import { Types } from 'mongoose';

@Controller('clinic')
export class UserClinicController {
    constructor(private readonly userClinicService: UserClinicService) {}

    @Put(':userId/clinic/:clinicId')
    async addClinicToUser(@Param('userId') userId: string, @Param('clinicId') clinicId: string): Promise<User> {
        return await this.userClinicService.addClinicToUser(userId, clinicId);
    }

    @Get(':userId/clinics')
    async getUserClinics(@Param('userId') userId: string): Promise<Clinic[]> {
        return await this.userClinicService.getUserClinics(userId);
    }
}
