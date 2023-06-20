import { CustomerEventService } from './customer-event.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerEvent, CustomerEventSchema, Customer, CustomerSchema } from '@monorepo/type';
import { AdModule } from '../ad/ad.module';
import { AccountModule } from '../account/account.module';
import { UserActionModule } from '../user-action/user-action.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CustomerEvent.name, schema: CustomerEventSchema }]),
        MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
        AdModule,
        AccountModule,
        UserActionModule
    ],
    providers: [CustomerEventService],
    exports: [CustomerEventService]
})

export class CustomerEventModule {}
