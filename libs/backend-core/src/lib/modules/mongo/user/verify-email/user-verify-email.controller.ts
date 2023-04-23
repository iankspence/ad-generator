import { UserVerifyEmailService } from './user-verify-email.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class UserVerifyEmailController {
    constructor(private readonly userVerifyEmailService: UserVerifyEmailService) {}
    @Post('verify-email')
    async verifyEmail(@Body('token') token: string): Promise<{ message: string }> {
        return this.userVerifyEmailService.verifyEmail(token);
    }
}
