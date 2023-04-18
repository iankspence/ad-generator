import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface ClaimDocument extends Claim, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Claim {
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

    @Prop({ required: true, type: String, ref: 'Review' })
    reviewId!: string;

    @Prop({ required: true })
    claimText!: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
