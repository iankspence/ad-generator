import { AdService } from './ad.service';
import { Controller } from '@nestjs/common';

@Controller('ad')
export class AdController {
    constructor(private readonly adService: AdService) {}
}
