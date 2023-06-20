import { UserSignInController } from './user-sign-in.controller';
import { UserSignInService } from './user-sign-in.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from '../../customer/customer.module';
import { UserActionModule } from '../../user-action/user-action.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '@monorepo/type';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        JwtModule.register({ secret: process.env.JWT_SECRET }),
        CustomerModule,
        UserActionModule
    ],
    controllers: [UserSignInController],
    providers: [UserSignInService],
    exports: [UserSignInService],
})
export class UserSignInModule {}
