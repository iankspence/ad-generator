import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAction, UserActionDocument } from '@monorepo/type';

@Injectable()
export class UserActionService {
    constructor(
        @InjectModel(UserAction.name) private userActionModel: Model<UserActionDocument>,
    ) {}

    async createUserAction(userId: string, accountId: string, context: string, dateTime: string, role: 'client' | 'content-manager' | 'admin', action: 'register' | 'sign-in' | 'sign-out' | 'customer-event' | 'download-ads' | 'submit-reviews-scrape' | 'save-ad' | 'copy-ad' | 'delete-ad' | 'create-pdf-ad-set' | 'submit-pdf-ad-set-for-review' | 'approve-pdf-ad-set' | 'deliver-ad' | 'set-ads-paid-without-delivery', actionDetails: { ip: string, userAgent: string, referrer: string, url: string, page: string, os: string, browser: string, device: string, screen: string, viewport: string, visitor: number, countryFromIp: string }, managerUserId?: string | null): Promise<UserActionDocument> {
        const userAction = new this.userActionModel({
            userId,
            accountId,
            context,
            dateTime,
            role,
            action,
            actionDetails,
            managerUserId
        });

        return userAction.save();
    }

    async getUserActions(userId: string, accountId: string): Promise<UserActionDocument[]> {
        return this.userActionModel.find({ userId, accountId }).exec();
    }

}
