import { UserMailerModule } from '../user-mailer.module';
import { UserForgotPasswordController } from './user-forgot-password.controller';
import { UserForgotPasswordService } from './user-forgot-password.service';
import { User, UserSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UserMailerModule],
    controllers: [UserForgotPasswordController],
    providers: [UserForgotPasswordService],
})
export class UserForgotPasswordModule {}
