import { HookService } from './hook.service';
import {Close, Hook} from '@monorepo/type';
import {Body, Controller, Post, Put} from '@nestjs/common';

@Controller('hook')
export class HookController {
    constructor(private readonly hookService: HookService) {}

    @Put('update-text-edit')
    async updateTextEdit(@Body() hook: Partial<Hook>): Promise<Hook> {
        return await this.hookService.updateTextEdit(hook);
    }

    @Post('get-by-review-id')
    async getHookByReviewId(@Body() reviewId: string): Promise<Hook[]> {
        return await this.hookService.getHooksByReviewId(reviewId);
    }
}
