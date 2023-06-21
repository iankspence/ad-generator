import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
    @Prop()
    contactName!: string;

    @Prop()
    companySite!: string;

    @Prop()
    email!: string;

    @Prop()
    cohort!: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
