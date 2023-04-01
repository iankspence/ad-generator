import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../mongo/user/user.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [forwardRef(() => UserModule), ConfigModule],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}
