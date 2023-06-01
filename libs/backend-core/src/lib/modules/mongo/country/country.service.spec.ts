import { CountryService } from './country.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CountryService', () => {
    let service: CountryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CountryService],
        }).compile();

        service = module.get<CountryService>(CountryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
