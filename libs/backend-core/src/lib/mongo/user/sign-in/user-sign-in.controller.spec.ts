import { UserSignInController } from './user-sign-in.controller';
import { UserSignInService } from './user-sign-in.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserSignInController', () => {
    let controller: UserSignInController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserSignInController],
            providers: [UserSignInService],
        }).compile();

        controller = module.get<UserSignInController>(UserSignInController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
