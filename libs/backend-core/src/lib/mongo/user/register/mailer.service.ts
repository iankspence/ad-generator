import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class MailerService {
    private readonly transactionalEmailsApi: SibApiV3Sdk.TransactionalEmailsApi;
    constructor(private readonly configService: ConfigService) {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = configService.get('SENDINBLUE_API_KEY');

        this.transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();
    }

    async sendVerificationEmail(email: string, verificationToken: string) {
        const verificationLink = `http://localhost:4200/verify-email?emailVerificationToken=${verificationToken}`;

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email }];
        sendSmtpEmail.subject = 'Email Verification';
        sendSmtpEmail.htmlContent = `<p>Please click the link below to verify your email address:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`;
        sendSmtpEmail.sender = {
            email: 'ian@chirocreative.ca',
            name: 'Chiro Creative',
        };

        await this.transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    }
}
