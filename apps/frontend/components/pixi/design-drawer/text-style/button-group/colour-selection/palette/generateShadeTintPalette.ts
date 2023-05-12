import chroma from 'chroma-js';

export const generateShadeTintPalette = (colour, count) => {
    const scale = chroma.scale([chroma(colour).darken(2.5), chroma(colour).brighten(2.5)]).mode('lch');
    return scale.colors(count);
};
