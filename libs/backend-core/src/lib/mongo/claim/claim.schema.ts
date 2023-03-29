import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Claim as ClaimInterface } from '@monorepo/type'

export type ClaimDocument = Claim & Document;

@Schema({ timestamps: true })
export class Claim implements ClaimInterface {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    clinicId: string;

    @Prop({ required: true })
    reviewId: string;

    @Prop({ required: true })
    positiveDescriptorId: string;

    @Prop(String)
    claimText: string
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
