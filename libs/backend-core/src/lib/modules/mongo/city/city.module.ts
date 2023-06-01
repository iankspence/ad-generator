import { CityService } from './city.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from '@monorepo/type';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    ],
    providers: [CityService],
    exports: [CityService],
})
export class CityModule {}
