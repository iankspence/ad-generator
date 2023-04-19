export function classifyReviewPrompt(prompt) {
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
