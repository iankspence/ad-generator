import { BrowseAiController } from './browse-ai.controller';
import { BrowseAiService } from './browse-ai.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('BrowseAiController', () => {
    let controller: BrowseAiController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BrowseAiController],
            providers: [BrowseAiService],
        }).compile();

        controller = module.get<BrowseAiController>(BrowseAiController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
