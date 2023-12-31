import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserControlledAttribute } from '../interface/mongo/ad/UserControlledAttribute';

export interface AdDocument extends Ad, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Ad {

    @Prop({ required: true })
    adNameDateTime!: string;

    @Prop({ required: true, type: String, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true })
    cardIds!: {
        canvasName: string,
        cardId: string,
    } [];

    @Prop({ required: true })
    cardLocations!: {
        canvasName: string,
        cardLocation: string,
    } [];

    @Prop({ required: true })
    filteredTextPositions!: {
        canvasName: string,
        position: number
    } [];

    @Prop({ required: true })
    userControlledAttributes!: UserControlledAttribute[];

    @Prop({ required: true })
    xRanges!: {
        canvasName: string,
        xRange: [number, number],
    }[];

    @Prop({ required: true })
    yRanges!: {
        canvasName: string,
        yRange: [number, number],
    }[];

    @Prop({ required: true })
    lineHeightMultipliers!: {
        canvasName: string,
        lineHeightMultiplier: number,
    }[];

    @Prop({ required: true })
    themeId!: string;

    @Prop({ required: true, type: String, ref: 'Copy' })
    copyText!: string;

    @Prop({ required: false })
    copyTextEdited?: string | null;

    @Prop({ required: true, type: String, ref: 'Review' })
    bestFitAudience!: number;

    @Prop({ required: true, type: String, ref: 'Review' })
    bestFitReasoning!: string;

    @Prop({ required: true, type: String, ref: 'Review' })
    source!: string;

    @Prop({ required: true, type: String, ref: 'Review' })
    reviewDate!: string;

    @Prop({ required: true, type: String })
    adStatus!: 'fresh' | 'pdf' | 'review' | 'approved' | 'delivered'

    @Prop({ required: false })
    adSetId?: string;

    @Prop({ required: false })
    adSetNameDateTime?: string;

    @Prop({ required: false })
    deliveryDate?: string;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
