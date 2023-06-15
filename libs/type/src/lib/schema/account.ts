import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface AccountDocument extends Account, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Account {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId!: Types.ObjectId;

    @Prop({ required: false, default: null })
    managerUserId?: string | null;

    @Prop({ required: true })
    companyName!: string;

    @Prop({ required: true })
    country!: string;

    @Prop({ required: true })
    provinceState!: string;

    @Prop({ required: true })
    city!: string;

    @Prop({ required: false, default: null })
    googleQuery?: string | null;

    @Prop({ type: [String], required: false, default: [] })
    rateMdsLinks?: string[];

    @Prop({ type: Object, required: false, default: {} })
    rateMdsHeaders?: object | null;

    @Prop({ required: false, default: null })
    facebookLink?: string | null;

    @Prop({ required: false, default: null })
    facebookAdAccount?: string | null;

    @Prop({ required: false, default: null })
    logo?: string | null;

    @Prop({required: true, default: '#707070'})
    primaryColor!: string

    @Prop({required: true, default: '#808080' })
    secondaryColor!: string

    @Prop({ required: true, default: true })
    isActive!: boolean;

    @Prop({ required: false, default: null })
    adsPaidWithoutDelivery?: number | null;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
