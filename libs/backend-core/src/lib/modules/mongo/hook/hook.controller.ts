import { HookService } from './hook.service';
import { Hook, HookDocument} from '@monorepo/type';
import {Body, Controller, Post} from '@nestjs/common';

@Controller('hook')
export class HookController {
    constructor(private readonly hookService: HookService) {}

    @Post('update-text-edit')
    async updateTextEdit(@Body() {hook}: {hook: Partial<HookDocument>}): Promise<Hook> {
        return await this.hookService.updateTextEdit(hook);
    }

    @Post('get-by-review-id')
    async getHookByReviewId(@Body() reviewId: string): Promise<Hook[]> {
        return await this.hookService.getHooksByReviewId(reviewId);
    }
}
