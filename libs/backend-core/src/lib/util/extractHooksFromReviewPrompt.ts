export function extractHooksFromReviewPrompt(reviewText: string): string {
    return `
You are an expert marketer turning online chiropractor reviews into text for content.
Can you extract 2-10 of the best quotes from this review? They must be direct quotes from the review.  It is important that these are direct quotes from the review because they will be used to generate facebook ads with visible quotes.
Each quote should be on its own line without any other text.  It should not be in quotation marks, just the text please.
The selected quotes should be the ones that are most likely to connect with the audience so they click on the ad and visit the chiropractor's office.
They should be as short and sweet as possible.  If you can't find any quotes that are short enough, then just use the longest ones.
Make sure to exclude any unnecessary words at the beginning or end of the quote.
Here is the review to generate content for ${reviewText}
`;

    // audienceNamePrompt: string,
    //     audienceReasoningPrompt: string,
    //     ageGroupPrompt: string,
    //     interests: string,
    //
    // I'm trying to turn reviews into engaging content.
    //
    // Can you generate 5 hooks, 5 claims, 5 copies, and 5 closes for an online review?
    //
    // Here is the review to generate content for ${reviewPrompt}:
    //
    // The purpose is to use these in combination to generate content to advertise the chiropractor's services.
    //
    // Sometimes reviews are from different services within a chiro office (like masssage, phyical therapy, acupuncture, etc).
    // For this reason, I don't want you to use the word "chiropractor" in any of your responses.
    //
    // Some more information about the audience of this review.
    //
    //     Audience Name: ${audienceNamePrompt}
    //     Reason For Selection: ${audienceReasoningPrompt}
    //     Age Group: ${ageGroupPrompt}
    //     Interests: ${interests}
    //
    //         Here are the criteria for each:
    // Hooks: Can you extract 3 of the best quotes from this review? They must be direct quotes from the review.  It is important that these are direct quotes from the review because they will be used to generate facebook ads.
    // The hook should be a complete thought on its own (even if not a complete sentence).  It must only contain characters that are in the review.
    //
    // Claims: 1-3 sentences that describe the benefits of the product or service. Does not need to be a direct quote from the review.
    //
    // Copies: 2-6 sentences that describe the features of the product or service. This will exist at the top of facebook ads so something that converts well there. Does not need to be a direct quote from the review.
    //
    // Closes: 1-2 sentences that describe the call to action or an enthymeme to get the reader to fill in the cta on their own. Does not need to be a direct quote from the review.
    //
    // I want the response to be formatted like this with the response only including the text for each section.
    //
    // Hooks:
    // This is a hook
    // This is another hook
    // This is a third hook
    //
    // Claims:
    // This is a claim
    // This is another claim
    // This is a third claim
    // This is a fourth claim
    // This is a fifth claim
    //
    // Copies:
    // This is a copy
    // This is another copy
    // This is a third copy
    // This is a fourth copy
    // This is a fifth copy
    //
    // Closes:
    // This is a close
    // This is another close
    // This is a third close
    // This is a fourth close
    // This is a fifth close`;
}
