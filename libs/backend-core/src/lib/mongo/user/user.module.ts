import { AuthModule } from '../../auth/auth.module';
import { RolesGuard } from '../../auth/roles.guard';
import { MailerService } from './register/mailer.service';
import { UserRegisterModule } from './register/user-register.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from '@monorepo/type';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
        ConfigModule,
        UserRegisterModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        MailerService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [UserService],
})
export class UserModule {}
