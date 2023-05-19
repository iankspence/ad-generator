import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as PIXI from "pixi.js";

export interface AdDocument extends Ad, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Ad {

    @Prop({ required: true })
    adNameDateTime!: string;

    @Prop({ required: true, type: String, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    hookCardId!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    hookCardLocation!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    claimCardId!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    claimCardLocation!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    reviewCardId!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    reviewCardLocation!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    closeCardId!: string;

    @Prop({ required: true, type: String, ref: 'Card' })
    closeCardLocation!: string;

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
    adStatus!: 'fresh' | 'queue' | 'delivered'

    @Prop({ required: false })
    deliveryType?: 'pdf' | 'facebook' | null

    @Prop({ required: true })
    canvasAppStages!: {
        canvasName: string,
        canvasAppStage: PIXI.Container,
    }[];

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
}

export const AdSchema = SchemaFactory.createForClass(Ad);
