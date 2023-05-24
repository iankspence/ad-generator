import { AdSetController } from './ad-set.controller';
import { AdSetService } from './ad-set.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdSet, AdSetSchema } from '@monorepo/type';
import { AdModule } from '../ad/ad.module';
import { BullConfigModule } from '../../bull/bull.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AdSet.name, schema: AdSetSchema }]),
        AdModule,
        BullConfigModule,
    ],
    controllers: [AdSetController],
    providers: [AdSetService],
})
export class AdSetModule {}
