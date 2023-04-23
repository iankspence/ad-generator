import { CopyService } from './copy.service';
import { Copy } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('copy')
export class CopyController {
    constructor(private readonly copyService: CopyService) {}

    @Post('seed')
    async seedCopy(@Body() copy: Partial<Copy>): Promise<Copy> {
        return await this.copyService.createCopy(copy);
    }

    @Post('get-by-review-id')
    async getCopiesByReviewId(@Body() reviewId: string): Promise<Copy[]> {
        return await this.copyService.getCopiesByReviewId(reviewId);
    }
}
