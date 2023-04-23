import { classifyReviewPrompt } from '../../utils/classifyReviewPrompt';
import { extractHooksFromReviewPrompt } from '../../utils/extractHooksFromReviewPrompt';
import { generateClaimCopyClosePrompt } from '../../utils/generateClaimCopyClosePrompt';
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
} from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Configuration, OpenAIApi } from 'openai';

function addPromptSuffix(prompt: string): string {
    const newPrompt = prompt + '\\n\\n###\\n\\n';
    console.log(newPrompt);
    return newPrompt;
}

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
    /**
     * Extract a positiveDescriptor and an array of business claims for a review.
     *
     * @param prompt - The review string to return values for.
     */
    async createCompletion(prompt: string): Promise<[string, string[]]> {
        const openai = new OpenAIApi(configuration);
        console.log('prompt from createCompletion: ', prompt);

        const response = await openai.createCompletion({
            model: 'davinci:ft-personal-2023-03-02-13-13-09',
            prompt: addPromptSuffix(prompt),
            temperature: 0.7,
            max_tokens: 80,
            stop: '\\n%',
        });

        const responseText = response.data.choices[0].text;
        const responseLines = responseText.trim().split('\n');
        const firstLineSplit = responseLines[0].split('\\n');
        const responsePositiveDescriptor = firstLineSplit[0];
        const firstClaim = firstLineSplit[1];
        const responseClaimArray = [firstClaim, ...responseLines.slice(1)];

        return [responsePositiveDescriptor, responseClaimArray];
    }

    /**
     * General API for GPT 4
     *
     * @param prompt - The review to classify audiences for.
     */
    async createCompletionGPT4(prompt: string): Promise<[number, string]> {
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
                    content: classifyReviewPrompt(prompt),
                },
            ],
            top_p: 0.05,
            max_tokens: 120,
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
        const [bestFitAudience, bestFitReasoning] = await this.createCompletionGPT4(review.reviewText);
        return this.reviewModel.findByIdAndUpdate(
            review._id,
            {
                bestFitAudience: bestFitAudience,
                bestFitReasoning: bestFitReasoning,
            },
            { new: true },
        );
    }

    async extractHooksFromReview(
        userId: string,
        accountId: string,
        reviewId: string,
        reviewText: string,
    ): Promise<Partial<HookDocument[]>> {
        const openai = new OpenAIApi(configuration);

        console.log(extractHooksFromReviewPrompt(reviewText));
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
                        content: extractHooksFromReviewPrompt(reviewText),
                    },
                ],
                top_p: 0.05,
                max_tokens: 250,
            });

            const responseContent = response.data.choices[0].message.content;
            const splitResponseContent = responseContent.split('\n');
            console.log('splitResponseContent: ', splitResponseContent);
            const hookArray: HookDocument[] = [];

            for (const line of splitResponseContent) {
                console.log('line before if check: ', line);
                if (reviewText.includes(line) && line.length > 2 && line !== '' && line !== null) {
                    console.log('line after if check: ', line);

                    const newHook = await this.hookModel.create({
                        hookText: line,
                        reviewId: reviewId,
                        userId,
                        accountId,
                    });

                    hookArray.push(newHook);
                }
            }

            console.log('hookArray: ', hookArray);

            return hookArray;
        } catch (error) {
            console.log('error from extractHooksFromReview: ', error);
        }
    }

    async generateClaimCopyClose(
        reviewId: string,
        reviewText: string,
        hookId: string,
        hookText: string,
        reviewAudienceName: string,
        reviewAudienceAge: string,
    ) {
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
                        content: generateClaimCopyClosePrompt(
                            reviewText,
                            hookText,
                            reviewAudienceName,
                            reviewAudienceAge,
                        ),
                    },
                ],
                top_p: 0.05,
                max_tokens: 250,
            });

            const responseContent = response.data.choices[0].message.content;
            const splitResponseContent = responseContent.split('\n');

            console.log('splitResponseContent: ', splitResponseContent);

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
                                reviewId,
                                hookId,
                                claimText: line,
                            });
                        }
                        if (currentCategory === 'copies') {
                            await this.copyModel.create({
                                reviewId,
                                hookId,
                                copyText: line,
                            });
                        }
                        if (currentCategory === 'closes') {
                            await this.closeModel.create({
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
