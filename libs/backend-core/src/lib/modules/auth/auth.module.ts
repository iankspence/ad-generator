import { UserModule } from '../mongo/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User, UserSchema } from '@monorepo/type';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        forwardRef(() => UserModule),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [
        LocalStrategy,
        JwtStrategy,
    ],
})
export class AuthModule {}
