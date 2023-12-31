import { HookService } from './hook.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HookService', () => {
    let service: HookService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HookService],
        }).compile();

        service = module.get<HookService>(HookService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
