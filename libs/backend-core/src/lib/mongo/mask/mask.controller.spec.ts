import { MaskController } from './mask.controller';
import { MaskService } from './mask.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MaskController', () => {
    let controller: MaskController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MaskController],
            providers: [MaskService],
        }).compile();

        controller = module.get<MaskController>(MaskController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
