import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class UserMailerService {
    private readonly transactionalEmailsApi: SibApiV3Sdk.TransactionalEmailsApi;
    constructor(private readonly configService: ConfigService) {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = configService.get('SENDINBLUE_API_KEY');

        this.transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();
    }

    async sendVerificationEmail(email: string, verificationToken: string) {
        const verificationLink = `${process.env.FRONTEND_URI}/verify-email?emailVerificationToken=${verificationToken}`;

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email }];
        sendSmtpEmail.subject = 'Email Verification';
        sendSmtpEmail.htmlContent = `
<p>Hi there,</p>
<p>We're excited to welcome you to our community! You're just one step away from finalizing your registration. By verifying your email address, you ensure a secure and personalized experience on our platform.</p>
<p>Please click the link below to verify your email address:</p>
<p><a href="${verificationLink}">Verify Email Address</a></p>
<p>If you did not sign up for this account, no further action is required. If you have any questions, feel free to reach out to our support team.</p>
<p>Thank you for joining us!</p>
<p>Cheers,</p>
<p>The ReviewDrum Team</p>
`;

        sendSmtpEmail.sender = {
            email: 'ian@reviewdrum.com',
            name: 'ReviewDrum',
        };

        await this.transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    }

    async sendResetPasswordEmail(email: string, resetPasswordToken: string) {
        const resetPasswordLink = `${process.env.FRONTEND_URI}/reset-password?resetPasswordToken=${resetPasswordToken}`;

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email }];
        sendSmtpEmail.subject = 'Reset Password';
        sendSmtpEmail.htmlContent = `<p>Please click the link below to reset your password:</p><p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`;
        sendSmtpEmail.sender = {
            email: 'ian@reviewdrum.com',
            name: 'ReviewDrum',
        };

        await this.transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    }
}
