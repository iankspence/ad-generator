import { HookController } from './hook.controller';
import { HookService } from './hook.service';
import { Hook, HookSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Hook.name, schema: HookSchema }])],
    controllers: [HookController],
    providers: [HookService],
})
export class HookModule {}
