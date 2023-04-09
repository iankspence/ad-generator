import { OutscraperController } from './outscraper.controller';
import { OutscraperService } from './outscraper.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OutscraperController', () => {
    let controller: OutscraperController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OutscraperController],
            providers: [OutscraperService],
        }).compile();

        controller = module.get<OutscraperController>(OutscraperController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
