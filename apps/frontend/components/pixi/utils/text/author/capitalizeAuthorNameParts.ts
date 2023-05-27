import {capitalizeFirstLetter} from "../capitalizeFirstLetter";

/**
 * Transforms an array of author name parts by capitalizing the first letter of each part and making the rest of the letters lowercase.
 *
 * This function receives an array of strings, where each string represents a part of an author's name. It returns a new array
 * where each part has been transformed to have the first letter capitalized and the rest of the letters in lowercase.
 *
 * For example, the array ['JOHN', 'DOE'] would be transformed into ['John', 'Doe'].
 *
 * @param {string[]} nameParts - The array of author name parts to be transformed.
 * @returns {string[]} A new array of strings, where each string has been transformed to have its first letter capitalized and the rest of the letters in lowercase.
 */
export const capitalizeAuthorNameParts = (nameParts) => {
    return nameParts.map(part => capitalizeFirstLetter(part.toLowerCase()));
};
