import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAction, UserActionDocument } from '@monorepo/type';
import { Request } from 'express';
import * as useragent from 'useragent';
import * as geoip from 'geoip-lite';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class UserActionService {
    constructor(
        @InjectModel(UserAction.name) private userActionModel: Model<UserActionDocument>,
        private readonly logger: LoggerService
    ) {}

    async createUserAction(createUserActionRequest: Partial<UserActionDocument>, req?: Request): Promise<UserActionDocument> {

        console.log('creating user action')
        if (req) {
            console.log('req exists')

            const userAgent = useragent.parse(req.headers['user-agent']);
            const geoData = geoip.lookup(req.ip);

            this.logger.verbose(`creating user action: ${JSON.stringify(createUserActionRequest)}`);

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

            this.logger.log((`created user action: ${createUserActionRequest.action} for user: ${createUserActionRequest.userId} and account: ${createUserActionRequest.accountId}`));

            return userAction.save();

        } else {
            console.log('req does not exist')

            this.logger.verbose(`creating user action: ${JSON.stringify(createUserActionRequest)}`);

            const userAction = new this.userActionModel({
                userId: createUserActionRequest.userId,
                accountId: createUserActionRequest.accountId,
                context: createUserActionRequest.context,
                dateTime: createUserActionRequest.dateTime,
                action: createUserActionRequest.action,
                actionDetails: {
                    ip: '',
                    userAgent: '',
                    referrer: '',
                    url: '',
                    os: '',
                    browser: '',
                    device: '',
                    geo: ''
                },
                managerUserId: createUserActionRequest.managerUserId? createUserActionRequest.managerUserId : ''
            });

            console.log('user action: ', userAction)

            this.logger.log((`created user action: ${createUserActionRequest.action} for user: ${createUserActionRequest.userId} and account: ${createUserActionRequest.accountId}`));

            return userAction.save();
        }

    }

    async getUserActions(userId: string, accountId: string): Promise<UserActionDocument[]> {
        return this.userActionModel.find({ userId, accountId }).exec();
    }

}
