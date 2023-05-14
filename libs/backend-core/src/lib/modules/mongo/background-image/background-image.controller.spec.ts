import { BackgroundImageController } from './background-image.controller';
import { BackgroundImageService } from './background-image.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('BackgroundImageController', () => {
    let controller: BackgroundImageController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BackgroundImageController],
            providers: [BackgroundImageService],
        }).compile();

        controller = module.get<BackgroundImageController>(BackgroundImageController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
