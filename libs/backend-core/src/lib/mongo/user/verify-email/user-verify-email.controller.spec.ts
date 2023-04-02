import { UserVerifyEmailController } from './user-verify-email.controller';
import { UserVerifyEmailService } from './user-verify-email.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserVerifyEmailController', () => {
    let controller: UserVerifyEmailController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserVerifyEmailController],
            providers: [UserVerifyEmailService],
        }).compile();

        controller = module.get<UserVerifyEmailController>(UserVerifyEmailController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
