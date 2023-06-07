import { CustomerEventService } from './customer-event.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerEvent, CustomerEventSchema } from '@monorepo/type';

@Module({
    imports: [MongooseModule.forFeature([{ name: CustomerEvent.name, schema: CustomerEventSchema }])],
    providers: [CustomerEventService],
    exports: [CustomerEventService]
})
export class CustomerEventModule {}
