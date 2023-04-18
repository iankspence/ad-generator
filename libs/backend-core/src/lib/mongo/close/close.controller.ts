import { CloseService } from './close.service';
import { Close } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('close')
export class CloseController {
    constructor(private readonly closeService: CloseService) {}

    @Post('seed')
    async seedClose(@Body() close: Partial<Close>): Promise<Close> {
        return await this.closeService.createClose(close);
    }

    @Post('get-by-review-id')
    async getCloseByReviewId(@Body() reviewId: string): Promise<Close[]> {
        return await this.closeService.getClosesByReviewId(reviewId);
    }
}
