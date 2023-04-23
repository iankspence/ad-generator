import { UserForgotPasswordService } from './user-forgot-password.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserForgotPasswordService', () => {
    let service: UserForgotPasswordService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserForgotPasswordService],
        }).compile();

        service = module.get<UserForgotPasswordService>(UserForgotPasswordService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
