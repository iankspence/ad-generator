export const abbreviateAuthor = (author) => {
    const nameParts = author.split(' ');
    if (nameParts.length > 1) {
        return `- ${nameParts[0]} ${nameParts[1].charAt(0)}.`;
    } else {
        return author;
    }
};
