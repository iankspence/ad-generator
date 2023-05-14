import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface AdDocument extends Card, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class Card {
    @Prop({ required: true, type: String, ref: 'User' })
    userId!: string;

    @Prop({ required: true, type: String, ref: 'Account' })
    accountId!: string;

    @Prop({ required: true, type: String })
    cardName!: string;

    @Prop({ required: true, type: String })
    sourceTextDocumentId!: string;

    @Prop({ required: true, type: String })
    sourceText!: string;

    @Prop({ required: true, type: String })
    sourceTextEdited!: string;

    @Prop({ required: true, type: String })
    cardLocation!: string;

    @Prop({ required: true, type: String })
    backgroundImageLocation!: string;

    @Prop({ required: true })
    maskLocations!: {
        maskLocation: string;
        maskName: string;
    }[]

    @Prop({ required: true, type: String })
    themeId!: string;

    @Prop({ required: true, type: String })
    primaryColor!: string;

    @Prop({ required: true, type: String })
    secondaryColor!: string;
}

export const AdSchema = SchemaFactory.createForClass(Card);
