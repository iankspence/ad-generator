import { BackgroundImageService } from './background-image.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('BackgroundImageService', () => {
    let service: BackgroundImageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BackgroundImageService],
        }).compile();

        service = module.get<BackgroundImageService>(BackgroundImageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
