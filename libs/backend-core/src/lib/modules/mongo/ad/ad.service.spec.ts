import { AdService } from './ad.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AdService', () => {
    let service: AdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AdService],
        }).compile();

        service = module.get<AdService>(AdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
