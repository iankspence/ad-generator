import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface HookDocument extends Hook, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Hook {
    @Prop({ required: true, type: String, ref: 'Review' })
    reviewId!: string;

    @Prop({ required: true })
    hookText!: string;
}

export const HookSchema = SchemaFactory.createForClass(Hook);
