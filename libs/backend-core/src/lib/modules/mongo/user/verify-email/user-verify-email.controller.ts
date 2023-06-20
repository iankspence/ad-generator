import { UserVerifyEmailService } from './user-verify-email.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { VerifyEmailDto } from '@monorepo/type';
import { Request } from 'express';
import { LoggerService } from '../../../logger/logger.service';

@Controller('user')
export class UserVerifyEmailController {
    constructor(private readonly userVerifyEmailService: UserVerifyEmailService,
                private readonly logger: LoggerService
    ) {
        this.logger.setContext('UserVerifyEmailController');
    }
    @Post('verify-email')
    async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto, @Req() req: Request): Promise<{ message: string }> {
        this.logger.verbose(`verifyEmailDto: ${JSON.stringify(verifyEmailDto)}`);
        return this.userVerifyEmailService.verifyEmail(verifyEmailDto.emailVerificationToken, req);
    }
}
