import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface ClinicDocument extends Clinic, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Clinic {
    @Prop({ required: true })
    clinicName!: string;

    @Prop({ required: true })
    contactName!: string;

    @Prop({ required: true })
    contactRole!: string;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true })
    city!: string;

    @Prop({ required: true })
    provinceState!: string;

    @Prop({ required: true })
    country!: string;

    @Prop({ required: false, default: null })
    googleLink!: string | null;

    @Prop({ required: false, default: null })
    facebookLink!: string | null;

    @Prop({ type: [String], required: false, default: [] })
    rateMDLinks!: string[];

    @Prop({ required: false, default: null })
    facebookAdAccount!: string | null;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId!: Types.ObjectId;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);
