import { removeNonLetterText } from './removeNonLetterText';

describe('removeNonLetterText function', () => {
    test('should return the same string when given a string with no non-letter characters', () => {
        const text = 'John Doe';
        const result = removeNonLetterText(text);
        expect(result).toEqual('John Doe');
    });

    test('should remove non-letter characters from a string', () => {
        const text = 'John_Doe_123';
        const result = removeNonLetterText(text);
        expect(result).toEqual('John Doe ');
    });

    test('should handle strings with spaces and periods', () => {
        const text = 'John D.oe';
        const result = removeNonLetterText(text);
        expect(result).toEqual('John D.oe');
    });

    test('should handle strings with special characters', () => {
        const text = 'John@Doe!';
        const result = removeNonLetterText(text);
        expect(result).toEqual('JohnDoe');
    });

    test('should handle an empty string', () => {
        const text = '';
        const result = removeNonLetterText(text);
        expect(result).toEqual('');
    });

    test('should handle strings with only non-letter characters', () => {
        const text = '1234567890';
        const result = removeNonLetterText(text);
        expect(result).toEqual('');
    });

    test('should handle strings with a mix of letter and non-letter characters', () => {
        const text = 'J@#o$%h^&n*D()oe123';
        const result = removeNonLetterText(text);
        expect(result).toEqual('JohnDoe');
    });

    test('should handle strings with upper and lower case letters', () => {
        const text = 'JOHN@Doe!';
        const result = removeNonLetterText(text);
        expect(result).toEqual('JOHNDoe');
    });
});
