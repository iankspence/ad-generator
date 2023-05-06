import { CopyService } from './copy.service';
import { Copy } from '@monorepo/type';
import {Body, Controller, Post, Put} from '@nestjs/common';

@Controller('copy')
export class CopyController {
    constructor(private readonly copyService: CopyService) {}

    @Put('update-text-edit')
    async updateTextEdit(@Body() copy: Partial<Copy>): Promise<Copy> {
        return await this.copyService.updateTextEdit(copy);
    }

    @Post('get-by-review-id')
    async getCopiesByReviewId(@Body() reviewId: string): Promise<Copy[]> {
        return await this.copyService.getCopiesByReviewId(reviewId);
    }
}
