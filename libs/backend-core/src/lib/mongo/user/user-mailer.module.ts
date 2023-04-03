import { UserAddClinicModule } from './add-clinic/user-add-clinic.module';
import { UserMailerService } from './user-mailer.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, UserAddClinicModule],
    providers: [UserMailerService],
    exports: [UserMailerService],
})
export class UserMailerModule {}
