import { HookController } from './hook.controller';
import { HookService } from './hook.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HookController', () => {
    let controller: HookController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HookController],
            providers: [HookService],
        }).compile();

        controller = module.get<HookController>(HookController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
