import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document, Types } from 'mongoose';

export interface UserDocument extends User, Document<Types.ObjectId> {}

export interface UserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

@Schema({ timestamps: true })
export class User implements UserMethods {
    @Prop({ required: true })
    companyName!: string;

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

    @Prop({ required: false, default: null })
    resetPasswordToken!: string | null;

    @Prop({ required: false, default: null })
    resetPasswordExpires!: Date | null;

    comparePassword!: (candidatePassword: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods['comparePassword'] = async function (this: User, candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};
