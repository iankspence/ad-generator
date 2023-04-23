import { CopyService } from './copy.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CopyService', () => {
    let service: CopyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CopyService],
        }).compile();

        service = module.get<CopyService>(CopyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
