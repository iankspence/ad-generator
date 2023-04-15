import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface CampaignDocument extends Campaign, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Campaign {
    @Prop({ required: true, type: String, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true })
    objective!: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
