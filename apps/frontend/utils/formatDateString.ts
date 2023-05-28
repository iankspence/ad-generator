export const formatDateString = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = String(date.getFullYear()).substring(2);

    return `${month}-${day}-${year}`;
}
