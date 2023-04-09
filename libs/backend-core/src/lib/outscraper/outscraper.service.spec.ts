import { OutscraperService } from './outscraper.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OutscraperService', () => {
    let service: OutscraperService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OutscraperService],
        }).compile();

        service = module.get<OutscraperService>(OutscraperService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
