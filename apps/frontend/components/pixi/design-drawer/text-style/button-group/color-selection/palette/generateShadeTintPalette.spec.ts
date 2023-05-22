import { generateShadeTintPalette } from './generateShadeTintPalette';
import chroma from 'chroma-js';

describe('generateShadeTintPalette', () => {
    describe('generateShadeTintPalette', () => {
        it('should generate a palette with the correct count', () => {
            const color = '#FF5733';
            const count = 5;
            const palette = generateShadeTintPalette(color, count);

            // Check the length of the generated palette
            expect(palette.length).toBe(count);
        });

        it('should generate a palette with valid colors', () => {
            const color = '#FF5733';
            const count = 5;
            const palette = generateShadeTintPalette(color, count);

            // Check that all colors in the palette are valid
            palette.forEach(colorInPalette => {
                expect(chroma.valid(colorInPalette)).toBe(true);
            });
        });

        it('should return an empty array when count is zero', () => {
            const color = '#FF5733';
            const count = 0;
            const palette = generateShadeTintPalette(color, count);

            // Check that the palette is empty
            expect(palette.length).toBe(count);
        });

        it('should throw an error when an invalid color is provided', () => {
            const color = 'not a color';
            const count = 5;

            // Check that the function throws an error
            expect(() => generateShadeTintPalette(color, count)).toThrow();
        });

        it('should throw an error when count is a negative number', () => {
            const color = '#FF5733';
            const count = -5;

            // Check that the function throws an error
            expect(() => generateShadeTintPalette(color, count)).toThrow();
        });

        it('should generate a valid palette when a non-hex color string is provided', () => {
            const color = 'red';
            const count = 5;
            const palette = generateShadeTintPalette(color, count);

            // Check that all colors in the palette are valid
            palette.forEach(colorInPalette => {
                expect(chroma.valid(colorInPalette)).toBe(true);
            });
        });

        it('should generate a palette with colors darker and brighter than the base color', () => {
            const color = '#FF5733';
            const count = 5;
            const palette = generateShadeTintPalette(color, count);
            const baseLuminance = chroma(color).luminance();

            // Check that the first color in the palette is darker than the base color
            expect(chroma(palette[0]).luminance()).toBeLessThan(baseLuminance);

            // Check that the last color in the palette is brighter than the base color
            expect(chroma(palette[count - 1]).luminance()).toBeGreaterThan(baseLuminance);
        });
    });
});
