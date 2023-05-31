import { UserVerifyEmailService } from './user-verify-email.service';
import { Body, Controller, Post } from '@nestjs/common';
import { VerifyEmailDto } from '@monorepo/type';

@Controller('user')
export class UserVerifyEmailController {
    constructor(private readonly userVerifyEmailService: UserVerifyEmailService) {}
    @Post('verify-email')
    async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<{ message: string }> {
        return this.userVerifyEmailService.verifyEmail(verifyEmailDto.emailVerificationToken);
    }
}
