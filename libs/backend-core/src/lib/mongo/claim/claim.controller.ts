import { ClaimService } from './claim.service';
import { Claim } from '@monorepo/type';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('claim')
export class ClaimController {
    constructor(private readonly claimService: ClaimService) {}

    @Post('seed')
    async seedClaim(@Body() claim: Partial<Claim>): Promise<Claim> {
        return await this.claimService.createClaim(claim);
    }

    @Post('get-by-review-id')
    async getClaimByReviewId(@Body() reviewId: string): Promise<Claim[]> {
        return await this.claimService.getClaimsByReviewId(reviewId);
    }
}
