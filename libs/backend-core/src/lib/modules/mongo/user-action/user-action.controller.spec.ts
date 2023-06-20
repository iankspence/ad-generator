import { UserActionController } from './user-action.controller';
import { UserActionService } from './user-action.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserActionController', () => {
    let controller: UserActionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserActionController],
            providers: [UserActionService],
        }).compile();

        controller = module.get<UserActionController>(UserActionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
