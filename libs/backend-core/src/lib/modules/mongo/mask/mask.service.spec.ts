import { MaskService } from './mask.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MaskService', () => {
    let service: MaskService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MaskService],
        }).compile();

        service = module.get<MaskService>(MaskService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
