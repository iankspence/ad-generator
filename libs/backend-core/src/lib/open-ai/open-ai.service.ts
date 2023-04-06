import { Injectable } from '@nestjs/common';

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
    /**
     * Extract a positiveDescriptor and an array of business claims for a review.
     *
     * @param prompt - The review string to return values for.
     */
    async createCompletion(prompt: string): Promise<[string, string[]]> {
        console.log('creating completion for ', prompt);

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
     * @param prompt - The review to classify personas for.
     */
    async createCompletionGPT4(prompt: string): Promise<[number, number[]]> {
        console.log('creating gpt-4 completion for ', prompt);

        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a review persona classifier who determines which personas fit with a given online review',
                },
                {
                    role: 'user',
                    content: `Can you come up with the top 10 personas that would be seen by a chiropractic office?`,
                },
                {
                    role: 'assistant',
                    content: `
                    Here are the personas
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
        Interests: Holistic health, alternative medicine, wellness, nutrition, natural remedies, meditation, mindfulness, chiropractic care.`,
                },

                {
                    role: 'user',
                    content: `
                    Can you tell me which of the personas best  matches the review?  And can you tell me all of the personas that could have made the review?

                    I want the answer to be like this "4,1,2,4,7,9" - no other text please.
                    where persona 4 is the best fit but personas 1,2,4,7,9 could all be matched with it.
                    With every response, there should be at least one best fit persona and at least one other matching persona.

                    Here is the review ${prompt}`,
                },
            ],
            top_p: 0.05,
            max_tokens: 40,
        });

        const responseContent = response.data.choices[0].message.content;
        const parsedResponse = responseContent.split(',').map((x) => parseInt(x, 10));
        console.log('parsedResponse: ', parsedResponse);
        const bestFitPersona = parsedResponse[0];
        const otherMatchingPersonas = parsedResponse.slice(1);
        return [bestFitPersona, otherMatchingPersonas];
    }
}
