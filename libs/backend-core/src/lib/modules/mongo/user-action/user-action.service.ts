import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAction, UserActionDocument } from '@monorepo/type';
import { Request } from 'express';
import * as useragent from 'useragent';
import * as geoip from 'geoip-lite';

@Injectable()
export class UserActionService {
    constructor(
        @InjectModel(UserAction.name) private userActionModel: Model<UserActionDocument>,
    ) {}

    async createUserAction(createUserActionRequest: Partial<UserActionDocument>, req: Request): Promise<UserActionDocument> {
        const userAgent = useragent.parse(req.headers['user-agent']);
        const geoData = geoip.lookup(req.ip);

        const userAction = new this.userActionModel({
            userId: createUserActionRequest.userId,
            accountId: createUserActionRequest.accountId,
            context: createUserActionRequest.context,
            dateTime: createUserActionRequest.dateTime,
            action: createUserActionRequest.action,
            actionDetails: {
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                referrer: req.headers.referer,
                url: req.originalUrl,
                os: userAgent.os.toString(),
                browser: userAgent.toAgent(),
                device: userAgent.device.toString(),
                geo: geoData
            },
            managerUserId: createUserActionRequest.managerUserId
        });

        return userAction.save();
    }

    async getUserActions(userId: string, accountId: string): Promise<UserActionDocument[]> {
        return this.userActionModel.find({ userId, accountId }).exec();
    }

}
