import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CsvController', () => {
    let controller: CsvController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CsvController],
            providers: [CsvService],
        }).compile();

        controller = module.get<CsvController>(CsvController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
