import { UserClinicController } from './user-clinic.controller';
import { UserClinicService } from './user-clinic.service';
import { User, UserSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserClinicController],
    providers: [UserClinicService],
})
export class UserClinicModule {}
