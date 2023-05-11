export const addQuotesToText = (text) => {
    if (!text) {
        return '';
    }
    return `"${text}" `;
};
