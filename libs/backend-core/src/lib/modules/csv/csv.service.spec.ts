import { CsvService } from './csv.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CsvService', () => {
    let service: CsvService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CsvService],
        }).compile();

        service = module.get<CsvService>(CsvService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
