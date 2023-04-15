import { Review, ReviewDocument } from '@monorepo/type';
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

function reviewClassifierPrompt(prompt) {
    return `

Can you tell me which of the 10 audiences best matches the review?

Review:
${prompt}

Here are the audiences and their interests:
1. The Stressed Professional:
Age Range: 25 - 60 years
Interests: Business, entrepreneurship, career development, productivity, time management, stress relief, self - improvement.
2. The Weekend Warrior:
Age Range: 18 - 60 years
Interests: Fitness, sports, running, cycling, yoga, CrossFit, hiking, swimming, outdoor activities, sports injuries.
3. The Chronic Pain Sufferer:
Age Range: 30 - 70 years
Interests: Chronic pain, pain management, arthritis, sciatica, fibromyalgia, back pain, alternative medicine.
4. The Posture Protector:
Age Range: 25 - 60 years
Interests: Posture correction, ergonomics, office health, back pain, neck pain, spinal health, physical therapy.
5. The Aging Gracefully:
Age Range: 50 - 80 + years
Interests: Aging, senior health, joint health, arthritis, mobility, wellness, active aging, health and wellness.
6. The Accident Recovery:
Age Range: 18 - 70 years
Interests: Accident recovery, injury rehabilitation, whiplash, back pain, physical therapy, chiropractic care.
7. The Office Worker:
Age Range: 25 - 60 years
Interests: Office health, ergonomics, sitting posture, back pain, neck pain, work - life balance, health and wellness.
8. The Parent:
Age Range: 25 - 50 years
Interests: Parenting, child care, family health, mom and dad blogs, postpartum health, babywearing, family activities.
9. The Migraine Sufferer:
Age Range: 25 - 60 years
Interests: Migraine relief, headache relief, natural remedies, chronic pain, alternative medicine, chiropractic care.
10. The Holistic Health Seeker:
Age Range: 25 - 70 years
Interests: Holistic health, alternative medicine, wellness, nutrition, natural remedies, meditation, mindfulness, chiropractic care.

First write a 2-3 sentences on your decision including the name and number of the best fit audience and why you chose that one for this review, then on the final line of your answer write the number of the audience.

I want the final row of the answer to only have the audience number (from 1-10) like this "4" - no other text please.`;
}

@Injectable()
export class OpenAiService {
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}
    /**
     * Extract a positiveDescriptor and an array of business claims for a review.
     *
     * @param prompt - The review string to return values for.
     */
    async createCompletion(prompt: string): Promise<[string, string[]]> {
        const openai = new OpenAIApi(configuration);
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
                    content: reviewClassifierPrompt(prompt),
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
}
