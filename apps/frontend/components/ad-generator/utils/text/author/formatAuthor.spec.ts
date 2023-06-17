import { formatAuthor } from './formatAuthor';

describe('formatAuthor function', () => {
    test('should return an empty string when given an empty string', () => {
        const author = '';
        const result = formatAuthor(author);
        expect(result).toEqual('');
    });

    test('should return a properly formatted author name when given a single name part', () => {
        const author = 'john';
        const result = formatAuthor(author);
        expect(result).toEqual('- John');
    });

    test('should return a properly formatted author name when given two name parts', () => {
        const author = 'john doe';
        const result = formatAuthor(author);
        expect(result).toEqual('- John D.');
    });

    test('should return a properly formatted author name when given three name parts', () => {
        const author = 'john doe smith';
        const result = formatAuthor(author);
        expect(result).toEqual('- John D. S.');
    });

    test('should return a properly formatted author name when given more than three name parts', () => {
        const author = 'john doe smith jones';
        const result = formatAuthor(author);
        expect(result).toEqual('- John D. S. J.');
    });

    test('should handle author names with extra spaces', () => {
        const author = '  john    doe   smith  jones  ';
        const result = formatAuthor(author);
        expect(result).toEqual('- John D. S. J.');
    });

    test('should handle author names with non-letter characters', () => {
        const author = 'john_doe_smith_jones123';
        const result = formatAuthor(author);
        expect(result).toEqual('- John D. S. J.');
    });

    test('should handle null values', () => {
        const author = null;
        const result = formatAuthor(author);
        expect(result).toEqual('');
    });
});
