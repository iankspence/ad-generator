import { UserVerifyEmailService } from './user-verify-email.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserVerifyEmailService', () => {
    let service: UserVerifyEmailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserVerifyEmailService],
        }).compile();

        service = module.get<UserVerifyEmailService>(UserVerifyEmailService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
