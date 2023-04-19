export function extractHooksFromReviewPrompt(reviewText: string): string {
    return `
Can you extract 2-5 of the best direct quotes (case sensitive) from this review?.
Each quote should be on its own line without any other text or numbers.  It should not have quotation marks, just the text.
They should be as short and sweet as possible.  If you can't find any quotes that are short enough, then use the longer ones.
Please exclude any unnecessary words at the beginning or end of the quote.
Make sure your quotes are exact quotes (case sensitive and include punctuation).

Here is the review to generate content for ${reviewText}
`;
}
