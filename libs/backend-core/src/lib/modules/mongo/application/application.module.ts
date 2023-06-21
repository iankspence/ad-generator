import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema, Customer, CustomerSchema } from '@monorepo/type';

@Module({
    imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }])],
    controllers: [ApplicationController],
    providers: [ApplicationService],
})
export class ApplicationModule {}
