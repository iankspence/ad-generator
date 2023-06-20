import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../../../auth/local-auth.guard';
import { UserSignInService } from './user-sign-in.service';
import { Req, Res, UseGuards, Post, Controller, Request as NestRequest, Get } from '@nestjs/common'; // Aliased here
import { Request, Response } from 'express';
import { UserDocument } from '@monorepo/type';

interface RequestWithUser extends Request {
    user: UserDocument;
}

@Controller('user')
export class UserSignInController {
    constructor(private readonly userSignInService: UserSignInService) {}

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    async signIn(@NestRequest() req, @Res() res: Response) {
        try {
            const { user, token } = await this.userSignInService.signIn(req.user);
            res.cookie('userCookie', token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
                maxAge: 3600 * 1000 * 24 * 7, // 7 days
            });
            res.json(user);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('sign-out')
    async signOut(@Req() req: Request, @Res() res: Response) {
        res.clearCookie('userCookie');
        return res.status(200).send({ message: 'Successfully signed out.' });
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-current-user')
    async getCurrentUser(@Req() req: RequestWithUser) {
        return req.user;
    }
}
