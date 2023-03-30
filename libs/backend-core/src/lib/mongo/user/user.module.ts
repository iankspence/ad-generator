import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@monorepo/type';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "../../auth/roles.guard";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {AuthModule} from "../../auth/auth.module";
import {MailerService} from "./mailer.service";
import { ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-secret-key',
            signOptions: { expiresIn: '24h' },
        }),
        ConfigModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        MailerService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
    ],
    exports: [UserService],
})
export class UserModule {}
