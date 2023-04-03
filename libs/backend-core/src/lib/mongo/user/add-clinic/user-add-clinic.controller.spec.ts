import { UserAddClinicController } from './user-add-clinic.controller';
import { UserAddClinicService } from './user-add-clinic.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AddClinicController', () => {
    let controller: UserAddClinicController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserAddClinicController],
            providers: [UserAddClinicService],
        }).compile();

        controller = module.get<UserAddClinicController>(UserAddClinicController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
