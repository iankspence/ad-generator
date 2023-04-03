import { UserAddClinicService } from './user-add-clinic.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AddClinicService', () => {
    let service: UserAddClinicService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserAddClinicService],
        }).compile();

        service = module.get<UserAddClinicService>(UserAddClinicService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
