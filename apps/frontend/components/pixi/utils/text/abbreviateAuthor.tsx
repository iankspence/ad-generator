import {capitalizeFirstLetter} from "./capitalizeFirstLetter";

export const abbreviateAuthor = (author) => {
    if (!author) {
        return '';
    }
    const nameParts = author.split(' ');
    if (nameParts.length > 1) {
        return `- ${capitalizeFirstLetter(nameParts[0])} ${capitalizeFirstLetter(nameParts[1]).charAt(0)}.`;
    } else {
        return author;
    }
};
