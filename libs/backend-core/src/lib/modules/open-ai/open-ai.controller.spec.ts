import { Test, TestingModule } from '@nestjs/testing';
import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';

describe('OpenAiController', () => {
    let controller: OpenAiController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OpenAiController],
            providers: [OpenAiService],
        }).compile();

        controller = module.get<OpenAiController>(OpenAiController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
