import { generateColorPalettes } from './generateColorPalettes';
import chroma from 'chroma-js';

describe('generateColorPalettes', () => {
    it('should return an array of three arrays', () => {
        const color = '#FF5733';
        const colorPalettes = generateColorPalettes(color);

        expect(colorPalettes.length).toBe(3);
        colorPalettes.forEach(palette => {
            expect(Array.isArray(palette)).toBe(true);
        });
    });

    it('should return arrays of length 8', () => {
        const color = '#FF5733';
        const colorPalettes = generateColorPalettes(color);

        colorPalettes.forEach(palette => {
            expect(palette.length).toBe(8);
        });
    });

    it('should return valid colors in all arrays', () => {
        const color = '#FF5733';
        const colorPalettes = generateColorPalettes(color);

        colorPalettes.forEach(palette => {
            palette.forEach(color => {
                expect(chroma.valid(color)).toBe(true);
            });
        });
    });

    it('should throw an error when an invalid color is provided', () => {
        const color = 'not a color';
        expect(() => generateColorPalettes(color)).toThrow();
    });

    it('should generate different palettes for the input color and its split complementary colors', () => {
        const color = '#FF5733';
        const colorPalettes = generateColorPalettes(color);

        expect(colorPalettes[0]).not.toEqual(colorPalettes[1]);
        expect(colorPalettes[0]).not.toEqual(colorPalettes[2]);
        expect(colorPalettes[1]).not.toEqual(colorPalettes[2]);
    });

    it('should generate palettes where the first color is darker and the last color is brighter', () => {
        const color = '#FF5733';
        const colorPalettes = generateColorPalettes(color);

        colorPalettes.forEach(palette => {
            expect(chroma(palette[0]).luminance()).toBeLessThan(chroma(color).luminance());
            expect(chroma(palette[7]).luminance()).toBeGreaterThan(chroma(color).luminance());
        });
    });

    it('should return different palettes for different colors', () => {
        const color1 = '#FF5733';
        const color2 = '#33FF57';
        const colorPalettes1 = generateColorPalettes(color1);
        const colorPalettes2 = generateColorPalettes(color2);

        expect(colorPalettes1).not.toEqual(colorPalettes2);
    });
});
