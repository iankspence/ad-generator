import { OpenAiService } from './open-ai.service';
import { Hook, ReviewDocument } from '@monorepo/type';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('open-ai')
export class OpenAiController {
    constructor(private readonly openAiService: OpenAiService) {}

    /**
     * @param prompt - The review string to return values for.
     * @returns - [positiveDescriptor, claims]
     */
    @Post('create-completion')
    async createCompletion(@Body('prompt') prompt: string): Promise<[string, string[]]> {
        return await this.openAiService.createCompletion(prompt);
    }

    /**
     * @param prompt  - The prompt to return a string for
     * @returns - response string
     */
    @Post('create-completion-gpt4')
    async createCompletionGPT4(@Body('prompt') prompt: string): Promise<[number, string]> {
        return await this.openAiService.createCompletionGPT4(prompt);
    }

    @Post('extract-hooks-from-review')
    async extractHooksFromReview(
        @Body('userId') userId: string,
        @Body('accountId') accountId: string,
        @Body('reviewId') reviewId: string,
        @Body('reviewText') reviewText: string,
    ): Promise<Hook[]> {
        return await this.openAiService.extractHooksFromReview(userId, accountId, reviewId, reviewText);
    }

    @Post('generate-claim-copy-close')
    async generateClaimCopyClose(
        @Body('accountId') accountId: string,
        @Body('reviewId') reviewId: string,
        @Body('reviewText') reviewText: string,
        @Body('hookId') hookId: string,
        @Body('hookText') hookText: string,
        @Body('reviewAudienceName') reviewAudienceName: string,
        @Body('reviewAudienceAge') reviewAudienceAge: string,
    ): Promise<void> {
        return await this.openAiService.generateClaimCopyClose(
            accountId,
            reviewId,
            reviewText,
            hookId,
            hookText,
            reviewAudienceName,
            reviewAudienceAge,
        );
    }
}
