import { removeNonLetterText } from './removeNonLetterText';
import { splitAuthorName } from './splitAuthorName';
import { capitalizeAuthorNameParts } from './capitalizeAuthorNameParts';
import { abbreviateNamesAfterFirst } from './abbreviateNamesAfterFirst';

/**
 * Formats the given author's name according to specific rules.
 *
 * This function performs the following operations on the input author's name:
 * 1. Removes non-letter characters, replacing underscores with spaces.
 * 2. Splits the name into parts using space as the separator.
 * 3. Capitalizes each name part.
 * 4. Abbreviates all name parts after the first one.
 *
 * The processed name parts are then joined back into a single string, with spaces between each part,
 * and a hyphen added at the beginning of the name.
 *
 * If the input author's name is a falsy value (null, undefined, or an empty string),
 * the function returns an empty string.
 *
 * @param {string} author - The author's name to format. Should be a string, but falsy values are also handled.
 * @returns {string} The formatted author's name, or an empty string if the input was a falsy value.
 *
 * @example
 * formatAuthor('john_doe smith'); // Returns '-John D. S.'
 */
export const formatAuthor = (author) => {
    if (!author) {
        return '';
    }

    author = removeNonLetterText(author);
    let nameParts = splitAuthorName(author);
    nameParts = capitalizeAuthorNameParts(nameParts);
    nameParts = abbreviateNamesAfterFirst(nameParts);

    return `- ${nameParts.join(' ')}`;
};
