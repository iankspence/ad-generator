import { AccountModule } from '../../account/account.module';
import { UserMailerModule } from '../user-mailer.module';
import { UserRegisterController } from './user-register.controller';
import { UserRegisterService } from './user-register.service';
import { User, UserSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from '../../customer/customer.module';
import { UserActionModule } from '../../user-action/user-action.module';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UserMailerModule,
        AccountModule,
        CustomerModule,
        UserActionModule
    ],
    controllers: [UserRegisterController],
    providers: [UserRegisterService],
})
export class UserRegisterModule {}
