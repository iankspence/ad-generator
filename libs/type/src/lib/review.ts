import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface ReviewDocument extends Review, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Review {
    @Prop({ required: true })
    source!: 'RateMds' | 'Google' | 'Facebook';

    @Prop({ required: true })
    userId!: string;

    @Prop({ required: true })
    clinicId!: string;

    @Prop({ required: true })
    position!: string;

    @Prop({ required: true })
    staffRating!: string;

    @Prop({ required: true })
    punctualityRating!: string;

    @Prop({ required: true })
    helpfulnessRating!: string;

    @Prop({ required: true })
    knowledgeRating!: string;

    @Prop({ required: true })
    reviewText!: string;

    @Prop({ required: true })
    reviewDate!: string;

    @Prop({ required: false })
    responseDate?: string;

    @Prop({ required: false })
    responseText?: string;

    // Additional fields for Google and Facebook reviews
    @Prop({ required: false })
    author?: string;

    @Prop({ required: false })
    bestFitPersona?: number;

    @Prop({ required: false, type: [Number] })
    otherMatchingPersonas?: number[];

    // Add any other fields specific to Google and Facebook reviews here
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
