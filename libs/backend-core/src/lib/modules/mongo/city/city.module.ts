import { CityService } from './city.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from '@monorepo/type';
import { CityController } from './city.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    ],
    controllers: [CityController],
    providers: [CityService],
    exports: [CityService],
})
export class CityModule {}
