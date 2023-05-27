import { splitAuthorName } from './splitAuthorName';

describe('splitAuthorName function', () => {
    test('should return an empty array when given an empty string', () => {
        const author = '';
        const result = splitAuthorName(author);
        expect(result).toEqual([]);
    });

    test('should return an array with a single element when given a single-word author name', () => {
        const author = 'John';
        const result = splitAuthorName(author);
        expect(result).toEqual(['John']);
    });

    test('should return an array with two elements when given a two-word author name', () => {
        const author = 'John Doe';
        const result = splitAuthorName(author);
        expect(result).toEqual(['John', 'Doe']);
    });

    test('should return an array with multiple elements when given a multiple-word author name', () => {
        const author = 'John Doe Smith';
        const result = splitAuthorName(author);
        expect(result).toEqual(['John', 'Doe', 'Smith']);
    });

    test('should handle author names with extra spaces', () => {
        const author = '   John    Doe   Smith   ';
        const result = splitAuthorName(author);
        expect(result).toEqual(['John', 'Doe', 'Smith']);
    });

    test('should handle author names with special characters', () => {
        const author = 'John_Doe_Smith';
        const result = splitAuthorName(author);
        expect(result).toEqual(['John_Doe_Smith']);
    });

    test('should handle author names with different capitalization', () => {
        const author = 'joHN doE SmiTh';
        const result = splitAuthorName(author);
        expect(result).toEqual(['joHN', 'doE', 'SmiTh']);
    });

    test('should handle author names with multiple spaces in between', () => {
        const author = 'John  Doe  Smith';
        const result = splitAuthorName(author);
        expect(result).toEqual(['John', 'Doe', 'Smith']);
    });
});
