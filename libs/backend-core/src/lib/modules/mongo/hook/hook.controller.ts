import { HookService } from './hook.service';
import { Hook } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('hook')
export class HookController {
    constructor(private readonly hookService: HookService) {}

    @Post('seed')
    async seedHook(@Body() hook: Partial<Hook>): Promise<Hook> {
        return await this.hookService.createHook(hook);
    }

    @Post('get-by-review-id')
    async getHookByReviewId(@Body() reviewId: string): Promise<Hook[]> {
        return await this.hookService.getHooksByReviewId(reviewId);
    }
}
