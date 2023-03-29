import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Review as ReviewInterface } from '@monorepo/type';

export type ReviewDocument = Review & Document;
@Schema({ timestamps: true })
export class Review implements ReviewInterface {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    clinicId: string;

    @Prop({ required: true })
    platform: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    reviewText: string;

    @Prop({ required: true })
    reviewYear: number;

    @Prop({ required: true })
    reviewMonth: number;

    @Prop({ required: true })
    reviewDay: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
