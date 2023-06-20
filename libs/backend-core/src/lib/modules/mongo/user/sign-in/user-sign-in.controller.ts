import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../../../auth/local-auth.guard';
import { UserSignInService } from './user-sign-in.service';
import { Req, Res, UseGuards, Post, Controller, Request as NestRequest, Get } from '@nestjs/common'; // Aliased here
import { Request, Response } from 'express';
import { Account, AccountDocument, UserDocument } from '@monorepo/type';
import { UserActionService } from '../../user-action/user-action.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

interface RequestWithUser extends Request {
    user: UserDocument;
}

@Controller('user')
export class UserSignInController {
    constructor(
        @InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>,
        private readonly userSignInService: UserSignInService,
        private readonly userActionService: UserActionService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    async signIn(@NestRequest() req, @Res() res: Response) {
        try {
            const { user, token } = await this.userSignInService.signIn(req.user);
            res.cookie('userCookie', token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
                maxAge: 3600 * 1000 * 24 * 7,
            });
            res.json(user);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('sign-out')
    async signOut(@Req() req: RequestWithUser, @Res() res: Response) {
        const account = await this.accountModel.findOne({ userId: req.user._id.toString() }).exec();
        if ( account ) {
            await this.userActionService.createUserAction({
                userId: req.user._id.toString(),
                accountId: account._id.toString(),
                context: 'UserSignInController',
                dateTime: new Date(),
                action: 'sign-out',
                managerUserId: account.managerUserId || '',
            });
        }
        res.clearCookie('userCookie');
        return res.status(200).send({ message: 'Successfully signed out.' });
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-current-user')
    async getCurrentUser(@Req() req: RequestWithUser) {
        const account = await this.accountModel.findOne({ userId: req.user._id.toString() }).exec();
        if ( account ) {
            await this.userActionService.createUserAction({
                userId: req.user._id.toString(),
                accountId: account._id.toString(),
                context: 'UserSignInController',
                dateTime: new Date(),
                action: 'get-current-user',
                managerUserId: account.managerUserId || '',
            });
        }
        return req.user;
    }
}
