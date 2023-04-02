import { UserSignInController } from './user-sign-in.controller';
import { UserSignInService } from './user-sign-in.service';
import { User, UserSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
    controllers: [UserSignInController],
    providers: [UserSignInService],
    exports: [UserSignInService],
})
export class UserSignInModule {}
