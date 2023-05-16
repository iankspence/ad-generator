import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface AdDocument extends Ad, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Ad {
    @Prop({ required: true, type: String, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    hookCardId!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    claimCardId!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    reviewCardId!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    closeCardId!: string;

    @Prop({ required: true })
    bestFitAudience!: number;

    @Prop({ required: true })
    bestFitReasoning!: string;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
