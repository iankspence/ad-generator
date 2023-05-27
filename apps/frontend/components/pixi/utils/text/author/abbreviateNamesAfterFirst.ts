/**
 * Abbreviates all name parts after the first in the provided array.
 *
 * This function takes an array of name parts and abbreviates (first character followed by a period) each part after the first.
 * If the part is an empty string, it leaves it as is.
 *
 * The function expects a non-empty array with at least one element.
 * The function modifies the array in-place and also returns the same array.
 *
 * @param {string[]} nameParts - The array containing the name parts. Each part should be a string.
 * @returns {string[]} The same array passed as parameter, but with the name parts after the first abbreviated.
 *
 * @example
 * abbreviateNamesAfterFirst(['John', 'Doe', 'Smith']); // Returns ['John', 'D.', 'S.']
 * abbreviateNamesAfterFirst(['John', '', 'Smith']); // Returns ['John', '', 'S.']
 */
export const abbreviateNamesAfterFirst = (nameParts) => {
    for (let i = 1; i < nameParts.length; i++) {
        if (nameParts[i] !== '') {
            nameParts[i] = nameParts[i].charAt(0) + ".";
        }
    }
    return nameParts;
};
