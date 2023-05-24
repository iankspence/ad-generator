import { sortPaletteByContrast } from './sortPaletteByContrast';
import * as chroma from 'chroma-js';

describe('sortPaletteByContrast', () => {
    it('should sort an array of colors by their contrast to a source color', () => {
        const palette = ['#000000', '#FFFFFF', '#888888'];
        const sourceColor = '#FFFFFF';
        const sortedPalette = sortPaletteByContrast(palette, sourceColor);
        expect(sortedPalette).toEqual(['#FFFFFF', '#888888', '#000000']);
    });

    it('should return the same array when all colors have the same contrast to the source color', () => {
        const palette = ['#FFFFFF', '#FFFFFF', '#FFFFFF'];
        const sourceColor = '#000000';
        const sortedPalette = sortPaletteByContrast(palette, sourceColor);
        expect(sortedPalette).toEqual(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
    });

    it('should sort grayscale colors based on contrast to white', () => {
        const palette = ['#000000', '#777777', '#BBBBBB', '#444444'];
        const sourceColor = '#FFFFFF';
        const sortedPalette = sortPaletteByContrast(palette, sourceColor);
        expect(sortedPalette).toEqual(['#BBBBBB', '#777777', '#444444', '#000000']);
    });

    it('should sort primary colors based on contrast to black', () => {
        const palette = ['#FF0000', '#0000FF', '#FFFF00'];
        const sourceColor = '#000000';
        const sortedPalette = sortPaletteByContrast(palette, sourceColor);
        expect(sortedPalette).toEqual(['#0000FF', '#FF0000', '#FFFF00']);
    });

    it('should correctly handle an empty array', () => {
        const palette = [];
        const sourceColor = '#FFFFFF';
        const sortedPalette = sortPaletteByContrast(palette, sourceColor);
        expect(sortedPalette).toEqual([]);
    });

    it('should not modify the original array', () => {
        const palette = ['#000000', '#FFFFFF', '#888888'];
        const sourceColor = '#FFFFFF';
        const originalPalette = [...palette];
        sortPaletteByContrast(palette, sourceColor);
        expect(palette).toEqual(originalPalette);
    });

    it('should correctly handle a source color with high contrast to all palette colors', () => {
        const palette = ['#000000', '#111111', '#222222'];
        const sourceColor = '#FFFFFF';
        const sortedPalette = sortPaletteByContrast(palette, sourceColor);
        expect(sortedPalette).toEqual(['#222222', '#111111', '#000000']);
    });

    it('should correctly handle a source color with low contrast to all palette colors', () => {
        const palette = ['#EEEEEE', '#DDDDDD', '#CCCCCC'];
        const sourceColor = '#FFFFFF';
        const sortedPalette = sortPaletteByContrast(palette, sourceColor);
        expect(sortedPalette).toEqual(['#EEEEEE', '#DDDDDD', '#CCCCCC']);
    });

    it('should correctly handle a source color equal to one of the palette colors', () => {
        const palette = ['#000000', '#FFFFFF', '#888888'];
        const sourceColor = '#000000';
        const sortedPalette = sortPaletteByContrast(palette, sourceColor);
        expect(sortedPalette).toEqual(['#000000', '#888888', '#FFFFFF']);
    });
});

