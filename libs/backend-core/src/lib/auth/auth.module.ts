import { UserModule } from '../mongo/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { RolesGuard } from './roles.guard';
import { User, UserSchema } from '@monorepo/type';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
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
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [JwtStrategy, LocalStrategy, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AuthModule {}
