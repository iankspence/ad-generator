import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface CloseDocument extends Close, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Close {
    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true, type: String, ref: 'Review' })
    reviewId!: string;

    @Prop({ required: true, type: String, ref: 'Hook' })
    hookId!: string;

    @Prop({ required: true })
    closeText!: string;
}

export const CloseSchema = SchemaFactory.createForClass(Close);
