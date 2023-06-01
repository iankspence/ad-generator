import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProvinceStateDocument = ProvinceState & Document;

@Schema({ timestamps: true })
export class ProvinceState {
    @Prop()
    name!: string;

    @Prop()
    countryName!: string;
}

export const ProvinceStateSchema = SchemaFactory.createForClass(ProvinceState);
