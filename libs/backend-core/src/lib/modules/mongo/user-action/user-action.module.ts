import { UserActionController } from './user-action.controller';
import { UserActionService } from './user-action.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAction, UserActionSchema } from '@monorepo/type';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserAction.name, schema: UserActionSchema }])],
    controllers: [UserActionController],
    providers: [UserActionService],
})
export class UserActionModule {}
