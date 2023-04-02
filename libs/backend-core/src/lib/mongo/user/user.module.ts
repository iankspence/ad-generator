import { AuthModule } from '../../auth/auth.module';
import { RolesGuard } from '../../auth/roles.guard';
import { MailerService } from './register/mailer.service';
import { UserRegisterModule } from './register/user-register.module';
import { UserSignInModule } from './sign-in/user-sign-in.module';
import { UserVerifyEmailModule } from './verify-email/user-verify-email.module';
import { User, UserSchema } from '@monorepo/type';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [forwardRef(() => AuthModule), UserRegisterModule, UserVerifyEmailModule, UserSignInModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class UserModule {}
