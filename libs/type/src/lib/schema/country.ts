import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({ timestamps: true })
export class Country {
    @Prop()
    name!: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
