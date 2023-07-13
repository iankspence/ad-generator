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
    dateTime!: Date;

    @Prop({ required: false, default: null })
    managerUserId?: string | null;

    @Prop({ required: true })
    action!:
        'register' |
        'verify-email' |
        'sign-in' |
        'get-current-user' |
        'sign-out' |
        'payment-intent-succeeded' |
        'invoice-payment-succeeded' |
        'customer-subscription-created' |
        'customer-subscription-updated' |
        'customer-subscription-deleted' |
        'download-ads' |
        'submit-reviews-scrape' |
        'create-ad' |
        'copy-ad' |
        'delete-ad' |
        'set-fresh-ad-status' |
        'set-pdf-ad-status' |
        'set-review-ad-status' |
        'set-approved-ad-status' |
        'set-delivered-ad-status';

    @Prop({ required: true, type: Object })
    actionDetails!: {
        ip: string,
        userAgent: string,
        referrer: string,
        url: string,
        os: string,
        browser: string,
        device: string,
        geo: {
            range: [number],
            country: string,
            region: string,
            eu: string,
            timezone: string,
            city: string,
            ll: [number],
            metro: number,
            area: number,
        } | string,
    }
}

export const UserActionSchema = SchemaFactory.createForClass(UserAction);
