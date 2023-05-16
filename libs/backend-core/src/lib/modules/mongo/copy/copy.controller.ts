import { CopyService } from './copy.service';
import { Copy, CopyDocument} from '@monorepo/type';
import {Body, Controller, Post, Put} from '@nestjs/common';

@Controller('copy')
export class CopyController {
    constructor(private readonly copyService: CopyService) {}

    @Post('update-text-edit')
    async updateTextEdit(@Body() {copy}: { copy: Partial<CopyDocument>}): Promise<CopyDocument> {
        return await this.copyService.updateTextEdit(copy);
    }

    @Post('get-by-review-id')
    async getCopiesByReviewId(@Body() reviewId: string): Promise<Copy[]> {
        return await this.copyService.getCopiesByReviewId(reviewId);
    }
}
