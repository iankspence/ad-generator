import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { UserActionService } from './user-action.service';
import { Request, Response } from 'express';
import { UserActionDocument } from '@monorepo/type';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('user-action')
export class UserActionController {
    constructor(private readonly userActionService: UserActionService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createUserAction(
        @Body() userActionRequest: Partial<UserActionDocument>,
        @Req() req: Request,
        @Res() res: Response
    ): Promise<void> {
        try {
            const newUserAction = await this.userActionService.createUserAction(userActionRequest, req);
            res.status(201).json(newUserAction);
        } catch (err) {
            res.status(500).json({ message: 'Failed to create user action', error: err.message });
        }
    }
}
