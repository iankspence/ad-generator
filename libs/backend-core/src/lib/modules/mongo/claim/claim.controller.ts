import { ClaimService } from './claim.service';
import {Claim, Close} from '@monorepo/type';
import {Body, Controller, Post, Put} from '@nestjs/common';

@Controller('claim')
export class ClaimController {
    constructor(private readonly claimService: ClaimService) {}
    @Put('update-text-edit')
    async updateTextEdit(@Body() claim: Partial<Claim>): Promise<Claim> {
        return await this.claimService.updateTextEdit(claim);
    }

    @Post('get-by-review-id')
    async getClaimByReviewId(@Body() reviewId: string): Promise<Claim[]> {
        return await this.claimService.getClaimsByReviewId(reviewId);
    }
}
