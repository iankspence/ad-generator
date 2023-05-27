import { abbreviateNamesAfterFirst } from './abbreviateNamesAfterFirst';

describe('abbreviateNamesAfterFirst function', () => {
    test('should return an empty array when given an empty array', () => {
        const nameParts = [];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual([]);
    });

    test('should return the same array when given a single name part', () => {
        const nameParts = ['John'];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual(['John']);
    });

    test('should return the same first name and an abbreviated second name', () => {
        const nameParts = ['John', 'Doe'];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual(['John', 'D.']);
    });

    test('should abbreviate names after the first when given three name parts', () => {
        const nameParts = ['John', 'Doe', 'Smith'];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual(['John', 'D.', 'S.']);
    });

    test('should abbreviate names after the first when given more than three name parts', () => {
        const nameParts = ['John', 'Doe', 'Smith', 'Jones'];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual(['John', 'D.', 'S.', 'J.']);
    });

    test('should abbreviate the first name if it is a single letter', () => {
        const nameParts = ['J', 'Doe', 'Smith', 'Jones'];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual(['J.', 'D.', 'S.', 'J.']);
    });

    test('should handle long names correctly', () => {
        const nameParts = ['Johnathan', 'Alexander', 'Christopher', 'Maximillian'];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual(['Johnathan', 'A.', 'C.', 'M.']);
    });

    test('should ignore empty strings in the array', () => {
        const nameParts = ['John', '', 'Smith'];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual(['John', '', 'S.']);
    });

    test('should correctly handle names already abbreviated', () => {
        const nameParts = ['T.', 'S.'];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual(['T.', 'S.']);
    });

    test('should correctly handle single letter name parts', () => {
        const nameParts = ['T', 'S'];
        const result = abbreviateNamesAfterFirst(nameParts);
        expect(result).toEqual(['T.', 'S.']);
    });
});
