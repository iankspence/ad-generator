import { UserSignInModule } from '../sign-in/user-sign-in.module';
import { UserVerifyEmailController } from './user-verify-email.controller';
import { UserVerifyEmailService } from './user-verify-email.service';
import { Account, AccountSchema, User, UserSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserActionModule } from '../../user-action/user-action.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        UserSignInModule,
        UserActionModule,
    ],
    controllers: [UserVerifyEmailController],
    providers: [UserVerifyEmailService],
})
export class UserVerifyEmailModule {}
