import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AdSet as AdSetInterface } from '@monorepo/type';

export type AdSetDocument = AdSet & Document;

@Schema({ timestamps: true })
export class AdSet implements AdSetInterface {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    clinicId: string;

    @Prop({ required: true })
    name: string;

    @Prop([String])
    links: string[];
}

export const AdSetSchema = SchemaFactory.createForClass(AdSet);
