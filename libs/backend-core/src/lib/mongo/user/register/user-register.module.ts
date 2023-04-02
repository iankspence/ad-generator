import { UserMailerModule } from '../user-mailer.module';
import { UserRegisterController } from './user-register.controller';
import { UserRegisterService } from './user-register.service';
import { User, UserSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [ConfigModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UserMailerModule],
    controllers: [UserRegisterController],
    providers: [UserRegisterService],
})
export class UserRegisterModule {}
