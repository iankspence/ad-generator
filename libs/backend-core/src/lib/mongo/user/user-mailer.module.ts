import { UserClinicModule } from './clinic/user-clinic.module';
import { UserMailerService } from './user-mailer.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, UserClinicModule],
    providers: [UserMailerService],
    exports: [UserMailerService],
})
export class UserMailerModule {}
