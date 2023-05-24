import { selectSourceColor } from './selectSourceColor';

describe('selectSourceColor', () => {
    it('should return primary color when sourceType is "primary"', () => {
        const autoColorSettings = { sourceType: 'primary' };
        const primaryColor = '#FF0000'; // red
        const secondaryColor = '#00FF00'; // green
        expect(selectSourceColor(autoColorSettings, primaryColor, secondaryColor)).toEqual(primaryColor);
    });

    it('should return secondary color when sourceType is "secondary"', () => {
        const autoColorSettings = { sourceType: 'secondary' };
        const primaryColor = '#FF0000'; // red
        const secondaryColor = '#00FF00'; // green
        expect(selectSourceColor(autoColorSettings, primaryColor, secondaryColor)).toEqual(secondaryColor);
    });

    it('should not return secondary color when sourceType is "primary"', () => {
        const autoColorSettings = { sourceType: 'primary' };
        const primaryColor = '#FF0000'; // red
        const secondaryColor = '#00FF00'; // green
        expect(selectSourceColor(autoColorSettings, primaryColor, secondaryColor)).not.toEqual(secondaryColor);
    });

    it('should not return primary color when sourceType is "secondary"', () => {
        const autoColorSettings = { sourceType: 'secondary' };
        const primaryColor = '#FF0000'; // red
        const secondaryColor = '#00FF00'; // green
        expect(selectSourceColor(autoColorSettings, primaryColor, secondaryColor)).not.toEqual(primaryColor);
    });

    it('should return undefined when sourceType is neither "primary" nor "secondary"', () => {
        const autoColorSettings = { sourceType: 'other' };
        const primaryColor = '#FF0000'; // red
        const secondaryColor = '#00FF00'; // green
        expect(selectSourceColor(autoColorSettings, primaryColor, secondaryColor)).toBeUndefined();
    });

    it('should return undefined when sourceType is not provided', () => {
        const autoColorSettings = {};
        const primaryColor = '#FF0000'; // red
        const secondaryColor = '#00FF00'; // green
        expect(selectSourceColor(autoColorSettings, primaryColor, secondaryColor)).toBeUndefined();
    });

    it('should return undefined when autoColorSettings is not provided', () => {
        const primaryColor = '#FF0000'; // red
        const secondaryColor = '#00FF00'; // green
        expect(selectSourceColor(undefined, primaryColor, secondaryColor)).toBeUndefined();
    });

    it('should return undefined when primaryColor is not provided', () => {
        const autoColorSettings = { sourceType: 'primary' };
        const secondaryColor = '#00FF00'; // green
        expect(selectSourceColor(autoColorSettings, undefined, secondaryColor)).toBeUndefined();
    });

    it('should return undefined when secondaryColor is not provided', () => {
        const autoColorSettings = { sourceType: 'secondary' };
        const primaryColor = '#FF0000'; // red
        expect(selectSourceColor(autoColorSettings, primaryColor, undefined)).toBeUndefined();
    });

    it('should return undefined when primaryColor and secondaryColor are not provided', () => {
        const autoColorSettings = { sourceType: 'primary' };
        expect(selectSourceColor(autoColorSettings, undefined, undefined)).toBeUndefined();
    });
});
