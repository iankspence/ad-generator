import { CloseController } from './close.controller';
import { CloseService } from './close.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CloseController', () => {
    let controller: CloseController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CloseController],
            providers: [CloseService],
        }).compile();

        controller = module.get<CloseController>(CloseController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
