import { ClaimService } from './claim.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ClaimService', () => {
    let service: ClaimService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClaimService],
        }).compile();

        service = module.get<ClaimService>(ClaimService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
