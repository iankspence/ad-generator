import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Card, CardSchema, Copy, CopySchema} from "@monorepo/type";
import {AdModule} from "../ad/ad.module";
import { UserActionModule } from '../user-action/user-action.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
        MongooseModule.forFeature([{ name: Copy.name, schema: CopySchema }]),
        AdModule,
        UserActionModule
    ],
    controllers: [CardController],
    providers: [CardService],
    exports: [CardService]
})
export class CardModule {}
