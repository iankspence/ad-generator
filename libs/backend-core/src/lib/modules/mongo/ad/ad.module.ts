import { AdController } from './ad.controller';
import { AdService } from './ad.service';
import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { Account, AccountSchema, Ad, AdSchema, Card, CardSchema } from '@monorepo/type';
import { CityModule } from '../city/city.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }]),
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
        CityModule,
    ],
    controllers: [AdController],
    providers: [AdService],
    exports: [AdService],
})
export class AdModule {}
