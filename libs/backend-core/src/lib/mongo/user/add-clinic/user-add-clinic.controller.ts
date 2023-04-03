import { UserAddClinicService } from './user-add-clinic.service';
import { User } from '@monorepo/type';
import { Controller, Put, Param } from '@nestjs/common';

@Controller('add-clinic')
export class UserAddClinicController {
    constructor(private readonly addClinicService: UserAddClinicService) {}

    @Put(':userId/clinic/:clinicId')
    async addClinicToUser(@Param('userId') userId: string, @Param('clinicId') clinicId: string): Promise<User> {
        return await this.addClinicService.addClinicToUser(userId, clinicId);
    }
}
