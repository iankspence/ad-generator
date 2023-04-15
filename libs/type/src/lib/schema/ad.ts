import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface AdDocument extends Ad, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Ad {
    @Prop({ required: true, type: String, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true, type: String, ref: 'Campaign' })
    campaignId!: string;

    @Prop({ required: true, type: String, ref: 'AdSet' })
    adSetId!: string;

    @Prop({ required: true, type: String, ref: 'Copy' })
    copyId!: string;

    @Prop({ required: true, type: String, ref: 'Hook' })
    hookId!: string;

    @Prop({ required: true, type: String, ref: 'Claim' })
    claimId!: string;

    @Prop({ required: true, type: String, ref: 'Review' })
    reviewId!: string;

    // These are on the review doc but may change
    @Prop({ required: true })
    bestFitAudience!: number;
    // These are on the review doc but may change
    @Prop({ required: true })
    bestFitReasoning!: string;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
