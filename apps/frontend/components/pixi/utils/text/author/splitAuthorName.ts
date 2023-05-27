/**
 * Splits an author name string into an array of name parts.
 *
 * This function takes an author name string and splits it into parts based on spaces.
 * It then trims each part to remove leading and trailing spaces. Empty parts are ignored and will not be included in the output.
 *
 * @param {string} author - The author name string to be split into parts.
 * @returns {string[]} An array of the name parts, with each part being a string.
 *
 * @example
 * splitAuthorName('John Doe Smith'); // Returns ['John', 'Doe', 'Smith']
 * splitAuthorName('   John    Doe   Smith   '); // Returns ['John', 'Doe', 'Smith']
 */
export const splitAuthorName = (author) => {
    return author.split(' ').filter(Boolean).map(part => part.trim());
};
