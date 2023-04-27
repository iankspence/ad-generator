import { CloseController } from './close.controller';
import { CloseService } from './close.service';
import { Close, CloseSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Close.name, schema: CloseSchema }])],
    controllers: [CloseController],
    providers: [CloseService],
    exports: [CloseService],
})
export class CloseModule {}
