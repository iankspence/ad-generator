import { UserForgotPasswordService } from './user-forgot-password.service';
import { ResetPasswordDto } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class UserForgotPasswordController {
    constructor(private readonly userForgotPasswordService: UserForgotPasswordService) {}
    @Post('forgot-password')
    async sendResetPasswordEmail(@Body('email') email: string): Promise<{ message: string }> {
        return this.userForgotPasswordService.sendResetPasswordEmail(email);
    }

    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        return await this.userForgotPasswordService.resetPassword(resetPasswordDto);
    }
}
