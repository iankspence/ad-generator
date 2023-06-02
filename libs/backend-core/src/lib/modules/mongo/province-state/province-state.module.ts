import { ProvinceStateService } from './province-state.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvinceState, ProvinceStateSchema } from '@monorepo/type';
import { ProvinceStateController } from './province-state.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ProvinceState.name, schema: ProvinceStateSchema }]),
    ],
    controllers: [ProvinceStateController],
    providers: [ProvinceStateService],
    exports: [ProvinceStateService]
})
export class ProvinceStateModule {}
