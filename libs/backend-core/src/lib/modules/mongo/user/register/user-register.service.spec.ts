import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisterService } from './user-register.service';

describe('UserRegisterService', () => {
    let service: UserRegisterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserRegisterService],
        }).compile();

        service = module.get<UserRegisterService>(UserRegisterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
