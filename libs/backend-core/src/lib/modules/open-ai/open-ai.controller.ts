import { OpenAiService } from './open-ai.service';
import { ExtractHooksFromReviewDto, Hook } from '@monorepo/type';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ClassifyReviewPromptDto, GenerateClaimCopyCloseDto } from '@monorepo/type';

@Controller('open-ai')
export class OpenAiController {
    constructor(private readonly openAiService: OpenAiService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('create-completion-gpt4')
    async createCompletionGPT4(@Body() classifyReviewPrompt: ClassifyReviewPromptDto): Promise<[number, string]> {
        return await this.openAiService.classifyReviewPrompt(classifyReviewPrompt);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('extract-hooks-from-review')
    async extractHooksFromReview(@Body() extractHooksFromReviewDto: ExtractHooksFromReviewDto): Promise<Hook[]> {
        return await this.openAiService.extractHooksFromReview(extractHooksFromReviewDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('generate-claim-copy-close')
    async generateClaimCopyClose(@Body() generateClaimCopyCloseDto: GenerateClaimCopyCloseDto): Promise<void> {
        return await this.openAiService.generateClaimCopyClose(generateClaimCopyCloseDto);
    }
}
