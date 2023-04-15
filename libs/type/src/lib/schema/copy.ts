import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface CopyDocument extends Copy, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Copy {
    @Prop({ required: true, type: String, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true, type: String, ref: 'Campaign' })
    campaignId!: string;

    @Prop({ required: true, type: String, ref: 'AdSet' })
    adSetId!: string;

    @Prop({ required: true, type: String, ref: 'Ad' })
    adId!: string;

    @Prop({ required: true, type: String, ref: 'Campaign' })
    reviewId!: string;

    // These are on the review doc but may change
    @Prop({ required: true })
    bestFitAudience!: number;
    // These are on the review doc but may change
    @Prop({ required: true })
    bestFitReasoning!: string;

    @Prop({ required: true })
    copyText!: string;
}

export const CopySchema = SchemaFactory.createForClass(Copy);
