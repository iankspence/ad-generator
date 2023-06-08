import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface CustomerEventDocument extends CustomerEvent, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class CustomerEvent {

    @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
    customerId!: Types.ObjectId;

    @Prop({ required: true })
    eventType!: string;

    @Prop({ required: true })
    stripeEventId!: string;

    @Prop({ type: {}, required: false })
    eventData?: Record<string, any>;
}

export const CustomerEventSchema = SchemaFactory.createForClass(CustomerEvent);
