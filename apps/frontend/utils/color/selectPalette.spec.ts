import { selectPalette } from './selectPalette';
import { generateShadeTintPalette } from './generateShadeTintPalette';
import { generateSplitComplementaryColors } from './generateSplitComplementaryColors';

describe('selectPalette', () => {
    const sourceColor = '#FF0000';
    const splitComplementaryColors = generateSplitComplementaryColors(sourceColor);

    it('should return the first split complementary color palette when paletteType is "split-complementary-1"', () => {
        const autoColorSettings = {
            paletteType: 'split-complementary-1',
        };
        const expectedPalette = generateShadeTintPalette(splitComplementaryColors[0], 8);
        expect(selectPalette(autoColorSettings, sourceColor)).toEqual(expectedPalette);
    });

    it('should return the second split complementary color palette when paletteType is "split-complementary-2"', () => {
        const autoColorSettings = {
            paletteType: 'split-complementary-2',
        };
        const expectedPalette = generateShadeTintPalette(splitComplementaryColors[1], 8);
        expect(selectPalette(autoColorSettings, sourceColor)).toEqual(expectedPalette);
    });

    it('should return the adjacent color palette when paletteType is "adjacent"', () => {
        const autoColorSettings = {
            paletteType: 'adjacent',
        };
        const expectedPalette = generateShadeTintPalette(sourceColor, 8);
        expect(selectPalette(autoColorSettings, sourceColor)).toEqual(expectedPalette);
    });

    it('should return undefined when paletteType is not "split-complementary-1", "split-complementary-2", or "adjacent"', () => {
        const autoColorSettings = {
            paletteType: 'unknown-palette-type',
        };
        expect(selectPalette(autoColorSettings, sourceColor)).toBeUndefined();
    });

    // Here are four more tests with invalid input
    it('should throw an error when sourceColor is not valid', () => {
        const autoColorSettings = {
            paletteType: 'adjacent',
        };
        const invalidSourceColor = 'not-a-valid-color';
        expect(() => selectPalette(autoColorSettings, invalidSourceColor)).toThrow('Invalid color provided');
    });

    it('should throw an error when autoColorSettings is not an object', () => {
        const autoColorSettings = 'not-an-object';
        expect(() => selectPalette(autoColorSettings, sourceColor)).toThrow('Expected autoColorSettings to be an object');
    });

    it('should throw an error when autoColorSettings.paletteType is not a string', () => {
        const autoColorSettings = {
            paletteType: 123,
        };
        expect(() => selectPalette(autoColorSettings, sourceColor)).toThrow('Expected autoColorSettings.paletteType to be a non-empty string');
    });

    it('should throw an error when autoColorSettings.paletteType is an empty string', () => {
        const autoColorSettings = {
            paletteType: '',
        };
        expect(() => selectPalette(autoColorSettings, sourceColor)).toThrow('Expected autoColorSettings.paletteType to be a non-empty string');
    });
});
