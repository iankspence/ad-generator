import { selectFinalColor } from './selectFinalColor';

describe('selectFinalColor', () => {
    const mockPalette = ['#FFFFFF', '#FFCCCC', '#FF9999', '#FF6666', '#FF3333', '#FF0000', '#CC0000', '#990000', '#660000', '#330000']
    const mockSourceColor = '#FFFFFF';

    it('should return the source color when minMaxType is "min" and minMaxDistance is 0', () => {
        const autoColorSettings = {
            minMaxType: 'min',
            minMaxDistance: 0
        };
        expect(selectFinalColor(autoColorSettings, mockPalette, mockSourceColor)).toBe(mockSourceColor);
    });

    it('should return the color with the closest contrast to the source but not the source when minMaxType is "min" and minMaxDistance is 1', () => {
        const autoColorSettings = {
            minMaxType: 'min',
            minMaxDistance: 1
        };
        const expectedColor = '#FFCCCC'; // This should be the color that has the closest contrast to mockSourceColor after excluding mockSourceColor itself from the palette
        expect(selectFinalColor(autoColorSettings, mockPalette, mockSourceColor)).toBe(expectedColor);
    });

    it('should return the color with the second closest contrast to the source when minMaxType is "min" and minMaxDistance is 2', () => {
        const autoColorSettings = {
            minMaxType: 'min',
            minMaxDistance: 2
        };
        const expectedColor = '#FF9999'; // This should be the color that has the second closest contrast to mockSourceColor after excluding mockSourceColor itself from the palette
        expect(selectFinalColor(autoColorSettings, mockPalette, mockSourceColor)).toBe(expectedColor);
    });

    it('should return the color with the third closest contrast to the source when minMaxType is "min" and minMaxDistance is 3', () => {
        const autoColorSettings = {
            minMaxType: 'min',
            minMaxDistance: 3
        };
        const expectedColor = '#FF6666'; // This should be the color that has the third closest contrast to mockSourceColor after excluding mockSourceColor itself from the palette
        expect(selectFinalColor(autoColorSettings, mockPalette, mockSourceColor)).toBe(expectedColor);
    });

    it('should return the color with maximum contrast when minMaxType is "max" and minMaxDistance is 0', () => {
        const autoColorSettings = {
            minMaxType: 'max',
            minMaxDistance: 0
        };
        const expectedColor = '#330000';
        expect(selectFinalColor(autoColorSettings, mockPalette, mockSourceColor)).toBe(expectedColor);
    });

    it('should return the second most contrasting color when minMaxType is "max" and minMaxDistance is 1', () => {
        const autoColorSettings = {
            minMaxType: 'max',
            minMaxDistance: 1
        };
        const expectedColor = '#660000';
        expect(selectFinalColor(autoColorSettings, mockPalette, mockSourceColor)).toBe(expectedColor);
    });

    it('should return the third most contrasting color when minMaxType is "max" and minMaxDistance is 2', () => {
        const autoColorSettings = {
            minMaxType: 'max',
            minMaxDistance: 2
        };
        const expectedColor = '#990000';
        expect(selectFinalColor(autoColorSettings, mockPalette, mockSourceColor)).toBe(expectedColor);
    });

    it('should return undefined when autoColorSettings is not provided', () => {
        expect(selectFinalColor(undefined, mockPalette, mockSourceColor)).toBeUndefined();
    });

    it('should return undefined when palette is not provided', () => {
        expect(selectFinalColor({}, undefined, mockSourceColor)).toBeUndefined();
    });

    it('should return undefined when sourceColor is not provided', () => {
        expect(selectFinalColor({}, mockPalette, undefined)).toBeUndefined();
    });
});
