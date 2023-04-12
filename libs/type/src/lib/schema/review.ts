import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface ReviewDocument extends Review, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Review {
    @Prop({ required: true })
    userId!: string;

    @Prop({ required: true })
    accountId!: string;

    @Prop({ required: true })
    source!: 'RateMDs' | 'Google' | 'Facebook';

    @Prop({ required: false })
    position?: string;

    @Prop({ required: false })
    staffRating?: string;

    @Prop({ required: false })
    punctualityRating?: string;

    @Prop({ required: false })
    helpfulnessRating?: string;

    @Prop({ required: false })
    knowledgeRating?: string;

    @Prop({ required: false })
    overallRating?: string;

    @Prop({ required: true })
    reviewText!: string;

    @Prop({ required: true })
    reviewDate!: string;

    @Prop({ required: false })
    responseDate?: string;

    @Prop({ required: false })
    responseText?: string;

    @Prop({ required: false })
    author?: string;

    @Prop({ required: false })
    bestFitPersona?: number;

    @Prop({ required: false, type: [Number] })
    otherMatchingPersonas?: number[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
