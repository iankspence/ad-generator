import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface CardDocument extends Card, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Card {
    @Prop({ required: true, type: String, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true })
    cardName!: string;

    @Prop({ required: true })
    sourceTextId!: string;

    @Prop({ required: true })
    sourceText!: string;

    @Prop({ required: false })
    sourceTextEdited?: string | null;

    @Prop({ required: true })
    cardLocation!: string;

    @Prop({ required: true })
    backgroundImageLocation!: string;

    @Prop({ required: true })
    maskLocations!: {
        maskName: string,
        maskLocation: string,
    }[];

    @Prop({ required: true })
    themeId!: string;

    @Prop({ required: true })
    primaryColor!: number[];

    @Prop({ required: true})
    secondaryColor!: number[];

}

export const CardSchema = SchemaFactory.createForClass(Card);
