import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Card, CardSchema, Copy, CopySchema} from "@monorepo/type";
import {AdModule} from "../ad/ad.module";

@Module({
    imports: [AdModule, MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]), MongooseModule.forFeature([{ name: Copy.name, schema: CopySchema }])],
    controllers: [CardController],
    providers: [CardService],
})
export class CardModule {}
