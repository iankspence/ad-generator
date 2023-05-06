import { CloseService } from './close.service';
import { Close, CloseDocument} from '@monorepo/type';
import {Body, Controller, Post, Put} from '@nestjs/common';

@Controller('close')
export class CloseController {
    constructor(private readonly closeService: CloseService) {}

    @Post('update-text-edit')
    async updateTextEdit(@Body() {close}: { close: Partial<CloseDocument>}): Promise<CloseDocument> {
        return await this.closeService.updateTextEdit(close);
    }

    @Post('get-by-review-id')
    async getCloseByReviewId(@Body() reviewId: string): Promise<Close[]> {
        return await this.closeService.getClosesByReviewId(reviewId);
    }
}
