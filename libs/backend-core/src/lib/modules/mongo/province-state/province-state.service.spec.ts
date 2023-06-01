import { ProvinceStateService } from './province-state.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ProvinceStateService', () => {
    let service: ProvinceStateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProvinceStateService],
        }).compile();

        service = module.get<ProvinceStateService>(ProvinceStateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
