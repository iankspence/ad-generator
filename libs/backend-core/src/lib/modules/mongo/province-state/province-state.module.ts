import { ProvinceStateService } from './province-state.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvinceState, ProvinceStateSchema } from '@monorepo/type';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ProvinceState.name, schema: ProvinceStateSchema }]),
    ],
    providers: [ProvinceStateService],
    exports: [ProvinceStateService]
})
export class ProvinceStateModule {}
