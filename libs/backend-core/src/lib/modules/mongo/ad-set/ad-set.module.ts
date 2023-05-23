import { AdSetController } from './ad-set.controller';
import { AdSetService } from './ad-set.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdSet, AdSetSchema, Ad, AdSchema } from '@monorepo/type';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AdSet.name, schema: AdSetSchema }]),
        MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }]),
    ],
    controllers: [AdSetController],
    providers: [AdSetService],
})
export class AdSetModule {}
