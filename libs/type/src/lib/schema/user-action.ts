import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface UserActionDocument extends UserAction, Document<Types.ObjectId> {}

@Schema({ timestamps: true })
export class UserAction {
    @Prop({ type: String, ref: 'User', required: true })
    userId!: string;

    @Prop({ type: String, ref: 'Account', required: true })
    accountId!: string;

    @Prop({ required: true })
    context!: string

    @Prop({ required: true })
    dateTime!: string

    @Prop({ required: true })
    role!: 'client' | 'content-manager' | 'admin';

    @Prop({ required: true })
    action!:
        'register' |
        'sign-in' |
        'sign-out' |
        'customer-event' |
        'download-ads' |
        'submit-reviews-scrape' |
        'save-ad' |
        'copy-ad' |
        'delete-ad' |
        'create-pdf-ad-set' |
        'submit-pdf-ad-set-for-review' |
        'approve-pdf-ad-set' |
        'deliver-ad' |
        'set-ads-paid-without-delivery'
    ;

    @Prop({ required: true, type: Object })
    actionDetails!: {
        ip: string,
        userAgent: string,
        referrer: string,
        url: string,
        page: string,
        os: string,
        browser: string,
        device: string,
        screen: string,
        viewport: string,
        visitor: number,
        countryFromIp: string,
    }

    @Prop({ required: false, default: null })
    managerUserId?: string | null;
}

export const UserActionSchema = SchemaFactory.createForClass(UserAction);
