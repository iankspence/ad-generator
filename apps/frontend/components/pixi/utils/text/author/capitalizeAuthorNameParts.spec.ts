import { capitalizeAuthorNameParts } from './capitalizeAuthorNameParts';

describe('capitalizeAuthorNameParts', () => {
    test('should capitalize a single name part', () => {
        const nameParts = ['john'];
        const result = capitalizeAuthorNameParts(nameParts);
        expect(result).toEqual(['John']);
    });

    test('should capitalize multiple name parts', () => {
        const nameParts = ['john', 'doe'];
        const result = capitalizeAuthorNameParts(nameParts);
        expect(result).toEqual(['John', 'Doe']);
    });

    test('should handle all lower case letters', () => {
        const nameParts = ['john', 'doe', 'smith'];
        const result = capitalizeAuthorNameParts(nameParts);
        expect(result).toEqual(['John', 'Doe', 'Smith']);
    });

    test('should handle all upper case letters', () => {
        const nameParts = ['JOHN', 'DOE', 'SMITH'];
        const result = capitalizeAuthorNameParts(nameParts);
        expect(result).toEqual(['John', 'Doe', 'Smith']);
    });

    test('should handle mix of lower and upper case letters', () => {
        const nameParts = ['joHN', 'DOe', 'SMith'];
        const result = capitalizeAuthorNameParts(nameParts);
        expect(result).toEqual(['John', 'Doe', 'Smith']);
    });

    test('should handle single-letter name parts', () => {
        const nameParts = ['j', 'd', 's'];
        const result = capitalizeAuthorNameParts(nameParts);
        expect(result).toEqual(['J', 'D', 'S']);
    });

    test('should handle empty strings in the array', () => {
        const nameParts = ['john', '', 'smith'];
        const result = capitalizeAuthorNameParts(nameParts);
        expect(result).toEqual(['John', '', 'Smith']);
    });

    test('should return an empty array when input is an empty array', () => {
        const nameParts = [];
        const result = capitalizeAuthorNameParts(nameParts);
        expect(result).toEqual([]);
    });
});
