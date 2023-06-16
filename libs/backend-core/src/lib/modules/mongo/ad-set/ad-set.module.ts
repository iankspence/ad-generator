import { AdSetController } from './ad-set.controller';
import { AdSetService } from './ad-set.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema, AdSet, AdSetSchema } from '@monorepo/type';
import { AdModule } from '../ad/ad.module';
import { BullConfigModule } from '../../bull/bull.module';
import { CardModule } from '../card/card.module';
import { CityModule } from '../city/city.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AdSet.name, schema: AdSetSchema }]),
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        AdModule,
        forwardRef(() => BullConfigModule),
        CardModule,
        CityModule
    ],
    controllers: [AdSetController],
    providers: [AdSetService],
    exports: [AdSetService],
})
export class AdSetModule {}
