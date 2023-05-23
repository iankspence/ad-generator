import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface AdSetDocument extends AdSet, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class AdSet {
    @Prop({ required: true, type: String, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true })
    adIds!: string[];

    @Prop({ required: true })
    bestFitAudience!: number;

    @Prop({ required: true })
    bestFitAudienceName!: string;

    @Prop({ required: true })
    ageRange!: [number, number];

    @Prop({ required: true })
    interests!: string[];


}

export const AdSetSchema = SchemaFactory.createForClass(AdSet);
