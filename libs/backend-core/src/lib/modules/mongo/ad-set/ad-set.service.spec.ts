import { AdSetService } from './ad-set.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AdSetService', () => {
    let service: AdSetService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AdSetService],
        }).compile();

        service = module.get<AdSetService>(AdSetService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
