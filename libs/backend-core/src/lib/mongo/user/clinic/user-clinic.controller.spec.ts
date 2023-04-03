import { UserClinicController } from './user-clinic.controller';
import { UserClinicService } from './user-clinic.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AddClinicController', () => {
    let controller: UserClinicController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserClinicController],
            providers: [UserClinicService],
        }).compile();

        controller = module.get<UserClinicController>(UserClinicController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
