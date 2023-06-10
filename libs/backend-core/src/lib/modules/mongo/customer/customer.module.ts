import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '@monorepo/type';
import { CustomerEventModule } from '../customer-event/customer-event.module';
import { CityModule } from '../city/city.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
        CustomerEventModule,
        CityModule
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [CustomerService]
})
export class CustomerModule {}
