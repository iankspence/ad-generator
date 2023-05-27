/**
 * Removes all non-letter characters from a string, replacing underscores with spaces.
 *
 * This function takes a string as input, replaces all underscore characters with spaces,
 * and then removes any characters that are not English alphabet letters, spaces, or periods.
 * The string processing is case-sensitive and does not alter the case of the letters.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The processed string with non-letter characters removed and underscores replaced by spaces.
 *
 * @example
 * removeNonLetterText('John_Doe_123'); // Returns 'John Doe '
 * removeNonLetterText('Hello, World!'); // Returns 'Hello World'
 */
export const removeNonLetterText = (text) => {
    return text.replace(/_/g, " ").replace(/[^a-zA-Z .]/g, "");
};
