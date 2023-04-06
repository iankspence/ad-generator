import { BrowseAiService } from './browse-ai.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('BrowseAiService', () => {
    let service: BrowseAiService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BrowseAiService],
        }).compile();

        service = module.get<BrowseAiService>(BrowseAiService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
