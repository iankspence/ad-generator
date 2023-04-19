import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface MaskDocument extends Mask, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Mask {
    @Prop({ required: true })
    maskName!: string;

    @Prop({ required: true })
    maskBase64!: string;
}

export const MaskSchema = SchemaFactory.createForClass(Mask);
