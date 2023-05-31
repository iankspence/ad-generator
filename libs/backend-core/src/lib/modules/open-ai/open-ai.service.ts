import { classifyReviewPrompt } from '../../utils/prompts/classifyReviewPrompt';
import { extractHooksFromReviewPrompt } from '../../utils/prompts/extractHooksFromReviewPrompt';
import { claimCopyClosePrompt } from '../../utils/prompts/claimCopyClosePrompt';
import {
    Claim,
    Hook,
    HookDocument,
    Review,
    ReviewDocument,
    ClaimDocument,
    Close,
    CloseDocument,
    Copy,
    CopyDocument,
    ClassifyReviewPromptDto,
    ExtractHooksFromReviewDto,
    GenerateClaimCopyCloseDto,
} from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

@Injectable()
export class OpenAiService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        @InjectModel(Hook.name) private hookModel: Model<HookDocument>,
        @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
        @InjectModel(Copy.name) private copyModel: Model<CopyDocument>,
        @InjectModel(Close.name) private closeModel: Model<CloseDocument>,
    ) {}

    async classifyReviewPrompt(classifyReviewPromptDto: ClassifyReviewPromptDto): Promise<[number, string]> {
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert marketer who is classifying online chiropractor reviews into 1 of 10 audiences.',
                },
                {
                    role: 'user',
                    content: classifyReviewPrompt(classifyReviewPromptDto.prompt),
                },
            ],
            top_p: 0.05,
            max_tokens: 150,
        });

        const responseContent = response.data.choices[0].message.content;
        const splitResponseContent = responseContent.split('\n');
        const bestFitNumberMatch = splitResponseContent[splitResponseContent.length - 1];
        const bestFitReasoning = splitResponseContent[0];

        if (!bestFitNumberMatch || !bestFitReasoning) {
            throw new Error(
                `Unable to extract best fit audience number and reasoning from the GPT-4 response. responseContent: ${responseContent} bestFitNumberMatch: ${bestFitNumberMatch} bestFitReasoningMatch: ${bestFitReasoning}`,
            );
        }

        return [parseInt(bestFitNumberMatch), bestFitReasoning];
    }

    async updateReviewWithClassification(reviewJob: { review: ReviewDocument }): Promise<ReviewDocument> {
        const review: ReviewDocument = reviewJob.review;
        const [bestFitAudience, bestFitReasoning] = await this.classifyReviewPrompt({
            prompt: review.reviewText,
        });
        return this.reviewModel.findByIdAndUpdate(
            review._id,
            {
                bestFitAudience: bestFitAudience,
                bestFitReasoning: bestFitReasoning,
            },
            { new: true },
        );
    }

    async extractHooksFromReview(extractHooksFromReviewDto: ExtractHooksFromReviewDto): Promise<HookDocument[]> {
        const openai = new OpenAIApi(configuration);

        try {
            const response = await openai.createChatCompletion({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are an expert marketer turning online chiropractor reviews into text for content.',
                    },
                    {
                        role: 'user',
                        content: extractHooksFromReviewPrompt(extractHooksFromReviewDto.reviewText),
                    },
                ],
                top_p: 0.05,
                max_tokens: 250,
            });

            const responseContent = response.data.choices[0].message.content;
            const splitResponseContent = responseContent.split('\n');
            const hookArray: HookDocument[] = [];

            for (const line of splitResponseContent) {
                if (extractHooksFromReviewDto.reviewText.includes(line) && line.length > 2 && line !== '' && line !== null) {

                    const newHook = await this.hookModel.create({
                        userId: extractHooksFromReviewDto.userId,
                        accountId: extractHooksFromReviewDto.accountId,
                        reviewId: extractHooksFromReviewDto.reviewId,
                        hookText: line,
                    });

                    hookArray.push(newHook);
                }
            }

            return hookArray;
        } catch (error) {
            console.log('error from extractHooksFromReview: ', error);
        }
    }

    async generateClaimCopyClose(generateClaimCopyCloseDto: GenerateClaimCopyCloseDto) {

        const {
            reviewText,
            hookText,
            reviewAudienceName,
            reviewAudienceAge,
            hookId,
            reviewId,
            accountId
        } = generateClaimCopyCloseDto;

        const openai = new OpenAIApi(configuration);
        try {
            const response = await openai.createChatCompletion({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are an expert marketer turning online chiropractor reviews into text for content.',
                    },
                    {
                        role: 'user',
                        content: claimCopyClosePrompt(
                            reviewText,
                            hookText,
                            reviewAudienceName,
                            reviewAudienceAge,
                        ),
                    },
                ],
                top_p: 0.05,
                max_tokens: 500,
            });

            const responseContent = response.data.choices[0].message.content;
            const splitResponseContent = responseContent.split('\n');

            let currentCategory = null;
            for (const line of splitResponseContent) {
                if (line.length > 2 && line !== '' && line !== null) {
                    if (line === 'Claims:') {
                        currentCategory = 'claims';
                    } else if (line === 'Copies:') {
                        currentCategory = 'copies';
                    } else if (line === 'Closes:') {
                        currentCategory = 'closes';
                    }

                    if (!line.includes('Claims:') && !line.includes('Copies:') && !line.includes('Closes:')) {
                        if (currentCategory === 'claims') {
                            await this.claimModel.create({
                                accountId,
                                reviewId,
                                hookId,
                                claimText: line,
                            });
                        }
                        if (currentCategory === 'copies') {
                            await this.copyModel.create({
                                accountId,
                                reviewId,
                                hookId,
                                copyText: line,
                            });
                        }
                        if (currentCategory === 'closes') {
                            await this.closeModel.create({
                                accountId,
                                reviewId,
                                hookId,
                                closeText: line,
                            });
                        }
                    }
                }
            }
        } catch (error) {
            console.log('error from extractHooksFromReview: ', error);
        }
    }
}
