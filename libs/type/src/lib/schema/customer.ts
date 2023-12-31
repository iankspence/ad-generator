import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface CustomerDocument extends Customer, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Customer {

    @Prop({ type: String, ref: 'User', required: true })
    userId!: string;

    @Prop({ type: String, ref: 'Account', required: true })
    accountId!: string;

    @Prop({ required: true })
    stripeCustomerId!: string;

    @Prop({ required: false, default: null })
    subscriptionId?: string | null;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
