import { LoggerService } from './logger.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('LoggerService', () => {
    let service: LoggerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LoggerService],
        }).compile();

        service = module.get<LoggerService>(LoggerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
