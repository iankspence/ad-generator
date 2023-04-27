import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface CopyDocument extends Copy, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Copy {
    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true, type: String, ref: 'Campaign' })
    reviewId!: string;

    @Prop({ required: true, type: String, ref: 'Hook' })
    hookId!: string;

    @Prop({ required: true })
    copyText!: string;
}

export const CopySchema = SchemaFactory.createForClass(Copy);
