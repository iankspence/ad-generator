import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PositiveDescriptor as PositiveDescriptorInterface } from '@monorepo/type';

export type PositiveDescriptorDocument = PositiveDescriptor & Document;

@Schema({ timestamps: true })
export class PositiveDescriptor implements PositiveDescriptorInterface {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    clinicId: string;

    @Prop({ required: true })
    reviewId: string;

    @Prop([String])
    positiveDescriptorText: string
}

export const PositiveDescriptorSchema = SchemaFactory.createForClass(PositiveDescriptor);
