import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisterController } from './user-register.controller';
import { UserRegisterService } from './user-register.service';

describe('UserRegisterController', () => {
    let controller: UserRegisterController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserRegisterController],
            providers: [UserRegisterService],
        }).compile();

        controller = module.get<UserRegisterController>(UserRegisterController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
