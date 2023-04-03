import { AuthModule } from '../../auth/auth.module';
import { UserClinicModule } from './clinic/user-clinic.module';
import { UserForgotPasswordModule } from './forgot-password/user-forgot-password.module';
import { UserRegisterModule } from './register/user-register.module';
import { UserSignInModule } from './sign-in/user-sign-in.module';
import { UserVerifyEmailModule } from './verify-email/user-verify-email.module';
import { Module, forwardRef } from '@nestjs/common';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        UserRegisterModule,
        UserVerifyEmailModule,
        UserSignInModule,
        UserForgotPasswordModule,
        UserClinicModule,
    ],
})
export class UserModule {}
