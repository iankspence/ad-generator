import { generateSplitComplementaryColors } from './generateSplitComplementaryColors';
import chroma from 'chroma-js';

describe('generateSplitComplementaryColors', () => {
    it('should generate two valid colors', () => {
        const color = '#FF5733';
        const splitComplementaryColors = generateSplitComplementaryColors(color);

        // Check the length of the generated colors
        expect(splitComplementaryColors.length).toBe(2);

        // Check that all colors in the palette are valid
        splitComplementaryColors.forEach(color => {
            expect(chroma.valid(color)).toBe(true);
        });
    });

    it('should generate split complementary colors', () => {
        const color = '#FF5733';
        const baseHue = chroma(color).hcl()[0];
        const splitComplementaryColors = generateSplitComplementaryColors(color);

        splitComplementaryColors.forEach(complementaryColor => {
            const complementaryHue = chroma(complementaryColor).hcl()[0];
            const hueDifference = Math.abs(complementaryHue - baseHue) % 360;

            // Check that the hue of the complementary color is approximately 150 or 210 degrees from the base hue
            if (!(Math.abs(hueDifference - 150) < 30 || Math.abs(hueDifference - 210) < 30)) {
                throw new Error(`Invalid complementary hue: ${hueDifference}`);
            }
        });
    });

    it('should throw an error when an invalid color is provided', () => {
        const color = 'not a color';

        // Check that the function throws an error
        expect(() => generateSplitComplementaryColors(color)).toThrow();
    });

    it('should handle grayscale colors correctly', () => {
        const color = '#808080'; // a mid-gray color
        const splitComplementaryColors = generateSplitComplementaryColors(color);

        // Check that both complementary colors have the same lightness as the base color
        splitComplementaryColors.forEach(complementaryColor => {
            expect(chroma(complementaryColor).luminance()).toBeCloseTo(chroma(color).luminance(), 1);
        });
    });

    it('should generate valid complementary colors when a non-hex color string is provided', () => {
        const color = 'red';
        const splitComplementaryColors = generateSplitComplementaryColors(color);

        // Check that all colors are valid
        splitComplementaryColors.forEach(color => {
            expect(chroma.valid(color)).toBe(true);
        });
    });

    it('should generate correct complementary colors for different points on the color wheel', () => {
        const colors = ['red', 'green', 'blue'];
        colors.forEach(color => {
            const baseHue = chroma(color).hcl()[0];
            const splitComplementaryColors = generateSplitComplementaryColors(color);

            splitComplementaryColors.forEach(complementaryColor => {
                const complementaryHue = chroma(complementaryColor).hcl()[0];
                const hueDifference = Math.abs(complementaryHue - baseHue) % 360;

                // Check that the hue of the complementary color is approximately 150 or 210 degrees from the base hue
                if (!(Math.abs(hueDifference - 150) < 30 || Math.abs(hueDifference - 210) < 30)) {
                    throw new Error(`Invalid complementary hue: ${hueDifference}`);
                }
            });
        });
    });

    it('should handle very light and very dark colors correctly', () => {
        const colors = ['#000000', '#FFFFFF']; // black and white
        colors.forEach(color => {
            const splitComplementaryColors = generateSplitComplementaryColors(color);

            // Check that all colors are valid
            splitComplementaryColors.forEach(color => {
                expect(chroma.valid(color)).toBe(true);
            });
        });
    });
});
