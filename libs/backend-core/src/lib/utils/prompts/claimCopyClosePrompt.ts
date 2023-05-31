export function claimCopyClosePrompt(
    reviewText: string,
    hookText: string,
    audienceNamePrompt: string,
    ageGroupPrompt: string,
): string {
    return `
Can you 5 claims, 5 copies, and 5 closes for an online review and hook?

Here is the review to generate content for ${reviewText}.
Here is the hook that we're using on the first page of the ad: ${hookText}.

The purpose is to use these in combination to generate high conversion content to advertise the chiropractor's services online.

Sometimes reviews are from different services within a chiro office (like masssage, phyical therapy, acupuncture, etc).
For this reason, I don't want you to use the word "chiropractor" in any of your responses (unless it's part of a quote from the review).

Some more information about the audience of this content you are generating:
    Audience Name: ${audienceNamePrompt}
    Age Group: ${ageGroupPrompt}

Claims: 1 sentence describing the benefits of the product or service - this should be a claim that is backed up by the review.
Copies: 3 sentences each describing the features of the product or service. This will exist at the top of facebook ads so something that converts well there.
Closes: 2 sentences of an enthymeme - related to their audience, to get the reader to fill in the cta on their own - the goal here is to avoid having a pushy 'book now' close.

I want the response to be formatted like this with the response only including the text for each section.
Each section should be on its own line without any other text or numbers. It should not have quotation marks, just the text.

Claims:
This is a claim.
This is another claim.
This is a third claim.
This is a fourth claim.
This is a fifth claim.

Copies:
This is a copy.
This is another copy.
This is a third copy.
This is a fourth copy.
This is a fifth copy.

Closes:
This is a close.
This is another close.
This is a third close.
This is a fourth close.
This is a fifth close.`;
}
