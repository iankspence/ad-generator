import { UserForgotPasswordController } from './user-forgot-password.controller';
import { UserForgotPasswordService } from './user-forgot-password.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserForgotPasswordController', () => {
    let controller: UserForgotPasswordController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserForgotPasswordController],
            providers: [UserForgotPasswordService],
        }).compile();

        controller = module.get<UserForgotPasswordController>(UserForgotPasswordController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
