import { UserSignInService } from './user-sign-in.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserSignInService', () => {
    let service: UserSignInService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserSignInService],
        }).compile();

        service = module.get<UserSignInService>(UserSignInService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
