import { UserSignInModule } from '../sign-in/user-sign-in.module';
import { UserVerifyEmailController } from './user-verify-email.controller';
import { UserVerifyEmailService } from './user-verify-email.service';
import { User, UserSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UserSignInModule],
    controllers: [UserVerifyEmailController],
    providers: [UserVerifyEmailService],
})
export class UserVerifyEmailModule {}
