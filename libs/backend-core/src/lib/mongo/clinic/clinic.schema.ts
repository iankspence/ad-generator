import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Clinic as ClinicInterface } from '@monorepo/type';

export type ClinicDocument = Clinic & Document;

@Schema({ timestamps: true })
export class Clinic implements ClinicInterface {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    provinceState: string;

    @Prop({ required: true })
    city: string;

    @Prop([String])
    logos: string[];

    @Prop({ required: true, minlength: 7, maxlength: 7 })
    primaryColour: string;

    @Prop({ required: true, minlength: 7, maxlength: 7 })
    secondaryColour: string;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);
