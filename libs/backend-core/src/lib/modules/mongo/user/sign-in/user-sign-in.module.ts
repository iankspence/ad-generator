import { UserSignInController } from './user-sign-in.controller';
import { UserSignInService } from './user-sign-in.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from '../../customer/customer.module';

@Module({
    imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), CustomerModule],
    controllers: [UserSignInController],
    providers: [UserSignInService],
    exports: [UserSignInService],
})
export class UserSignInModule {}
