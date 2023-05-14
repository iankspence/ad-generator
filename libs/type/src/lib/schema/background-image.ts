import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface BackgroundImageDocument extends BackgroundImage, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class BackgroundImage {
    @Prop({ required: true })
    backgroundImageName!: string;

    @Prop({ required: true })
    backgroundImageLocation!: string;
}

export const BackgroundImageSchema = SchemaFactory.createForClass(BackgroundImage);
