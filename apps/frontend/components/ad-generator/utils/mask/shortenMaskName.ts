/**
 * Shortens a mask name by dropping the first two sections separated by '-'.
 *
 * This function receives a string representing a mask name. It returns a new string
 * where the first two sections separated by '-' are removed.
 * If there are fewer than three sections in the mask name, it returns the original mask name.
 *
 * For example, the string 'mask-hook-basic-swoosh-tall-base-1' would be transformed into 'basic-swoosh-tall-base-1'.
 *
 * @param {string} maskName - The mask name to be shortened.
 * @returns {string} A new string, where the first two sections separated by '-' are removed or the original mask name if there are less than three sections.
 */
export const shortenMaskName = (maskName) => {
    const maskParts = maskName.split('-');
    return maskParts.length < 3 ? maskName : maskParts.slice(2).join('-');
};

