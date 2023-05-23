import { AdSetController } from './ad-set.controller';
import { AdSetService } from './ad-set.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AdSetController', () => {
    let controller: AdSetController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AdSetController],
            providers: [AdSetService],
        }).compile();

        controller = module.get<AdSetController>(AdSetController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
