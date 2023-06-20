import { UserActionService } from './user-action.service';
import { Controller } from '@nestjs/common';

@Controller('user-action')
export class UserActionController {
    constructor(private readonly userActionService: UserActionService) {}
}
