import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

// export type UserDocument = User & Document;
export interface UserDocument extends User, Document<Types.ObjectId> {}

export interface UserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

@Schema({ timestamps: true })
export class User implements UserMethods {
    @Prop({ required: true })
    clinicName!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    phone!: string;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true })
    password!: string;

    @Prop({ type: [String], required: true, default: ['user'] })
    roles!: string[];

    @Prop({ required: false, default: null })
    emailVerificationToken!: string | null;

    @Prop({ required: true, default: false })
    emailVerified!: boolean;

    comparePassword!: (candidatePassword: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods['comparePassword'] = async function (this: User, candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};
