import { UserAddClinicController } from './user-add-clinic.controller';
import { UserAddClinicService } from './user-add-clinic.service';
import { User, UserSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserAddClinicController],
    providers: [UserAddClinicService],
})
export class UserAddClinicModule {}
