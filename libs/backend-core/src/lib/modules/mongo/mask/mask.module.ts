import { MaskController } from './mask.controller';
import { MaskService } from './mask.service';
import { Mask, MaskSchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Mask.name, schema: MaskSchema }])],
    controllers: [MaskController],
    providers: [MaskService],
})
export class MaskModule {}
