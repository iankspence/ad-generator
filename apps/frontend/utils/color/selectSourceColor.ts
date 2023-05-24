/**
 * Selects the source color based on the provided settings and color inputs.
 * The function uses the 'sourceType' property from the autoColorSettings parameter to determine which color to return.
 *
 * The function will return undefined if the 'sourceType' property is not 'primary' or 'secondary'.
 *
 * @param {object} autoColorSettings - The settings object to determine the source color. This object should have a 'sourceType' property which is either 'primary' or 'secondary'.
 * @param {string} primaryColor - The primary color. This should be a valid color string.
 * @param {string} secondaryColor - The secondary color. This should be a valid color string.
 * @returns {string|undefined} The selected source color based on the 'sourceType' property from the autoColorSettings. If 'sourceType' is 'primary', the function returns primaryColor. If 'sourceType' is 'secondary', the function returns secondaryColor. If 'sourceType' is neither 'primary' nor 'secondary', the function returns undefined.
 */
export const selectSourceColor = (autoColorSettings, primaryColor, secondaryColor) => {
    if (!autoColorSettings || typeof autoColorSettings.sourceType !== 'string') {
        return undefined;
    }

    if (autoColorSettings.sourceType === 'primary') {
        return primaryColor;
    } else if (autoColorSettings.sourceType === 'secondary') {
        return secondaryColor;
    }
};
