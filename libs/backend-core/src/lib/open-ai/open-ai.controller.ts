import { Controller, Post, Body } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';

@Controller('open-ai')
export class OpenAiController {
    constructor(private readonly openAiService: OpenAiService) { }

    /**
     * @param prompt - The review string to return values for.
     * @returns - [positiveDescriptor, claims]
     */
    @Post('create-completion')
    async createCompletion(
        @Body('prompt') prompt: string
    ): Promise<[string, string[]]> {
        return await this.openAiService.createCompletion(prompt);
    }

    /**
     * @param prompt  - The prompt to return a string for
     * @returns - response string
     */
    @Post('create-completion-gpt4')
    async createCompletionGPT4(
        @Body('prompt') prompt: string
    ): Promise<string> {
        return await this.openAiService.createCompletionGPT4(prompt);
    }
}