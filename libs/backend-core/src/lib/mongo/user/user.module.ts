import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@monorepo/type';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {AuthService} from "./auth/auth.service";
import {LocalStrategy} from "./auth/local.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService, AuthService, LocalStrategy],
})
export class UserModule {}
