import { UserClinicService } from './user-clinic.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AddClinicService', () => {
    let service: UserClinicService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserClinicService],
        }).compile();

        service = module.get<UserClinicService>(UserClinicService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
