import { CopyController } from './copy.controller';
import { CopyService } from './copy.service';
import { Copy, CopySchema } from '@monorepo/type';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Copy.name, schema: CopySchema }])],
    controllers: [CopyController],
    providers: [CopyService],
})
export class CopyModule {}
