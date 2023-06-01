import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema({ timestamps: true })
export class City {
    @Prop()
    name!: string;

    @Prop()
    provinceState!: string;

    @Prop()
    country!: string;

    @Prop()
    latitude!: number;

    @Prop()
    longitude!: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
