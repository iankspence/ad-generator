import { generateAutoColor } from './generateAutoColor';
import { selectSourceColor } from './selectSourceColor';
import { selectPalette } from './selectPalette';
import { selectFinalColor } from './selectFinalColor';
import { generateShadeTintPalette } from './generateShadeTintPalette';
import { generateSplitComplementaryColors } from './generateSplitComplementaryColors';
import chroma from 'chroma-js';

describe('color generation functions', () => {
    it('should select the correct source color based on settings', () => {
        expect(selectSourceColor({sourceType: 'primary'}, 'red', 'blue')).toBe('red');
        expect(selectSourceColor({sourceType: 'secondary'}, 'red', 'blue')).toBe('blue');
        expect(selectSourceColor({sourceType: 'other'}, 'red', 'blue')).toBeUndefined();
    });

    it('should generate a shade and tint palette correctly', () => {
        const palette = generateShadeTintPalette('#ff0000', 5);
        expect(palette).toHaveLength(5);
        palette.forEach(color => expect(chroma.valid(color)).toBe(true));
    });

    it('should generate split complementary colors correctly', () => {
        const colors = generateSplitComplementaryColors('#ff0000');
        expect(colors).toHaveLength(2);
        colors.forEach(color => expect(chroma.valid(color)).toBe(true));
    });

    it('should select the correct palette based on settings and source color', () => {
        expect(() => selectPalette({paletteType: 'split-complementary-1'}, '#ff0000')).not.toThrow();
        expect(() => selectPalette({paletteType: 'split-complementary-2'}, '#ff0000')).not.toThrow();
        expect(() => selectPalette({paletteType: 'adjacent'}, '#ff0000')).not.toThrow();
        expect(() => selectPalette({paletteType: 'other'}, '#ff0000')).toThrow('Expected autoColorSettings.paletteType to be either "split-complementary-1", "split-complementary-2", or "adjacent"');
        expect(() => selectPalette({paletteType: 'split-complementary-1'}, 'invalid')).toThrow('Invalid color provided');
    });

    it('should select the correct final color based on settings', () => {
        const palette = ['#000000', '#ffffff', '#123456', '#abcdef'];
        expect(() => selectFinalColor({minMaxType: 'min', minMaxDistance: 0}, palette, '#000000')).not.toThrow();
        expect(() => selectFinalColor({minMaxType: 'min', minMaxDistance: 1}, palette, '#000000')).not.toThrow();
        expect(() => selectFinalColor({minMaxType: 'max', minMaxDistance: 0}, palette, '#000000')).not.toThrow();
        expect(() => selectFinalColor({minMaxType: 'max', minMaxDistance: 1}, palette, '#000000')).not.toThrow();
    });

    it('should generate auto color correctly', () => {
        const autoColorSettings = {
            sourceType: 'primary',
            paletteType: 'adjacent',
            minMaxType: 'min',
            minMaxDistance: 0
        };
        expect(() => generateAutoColor(autoColorSettings, '#123456', '#abcdef')).not.toThrow();
    });
});
