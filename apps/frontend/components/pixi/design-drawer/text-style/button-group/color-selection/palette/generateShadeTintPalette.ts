import chroma from 'chroma-js';

export const generateShadeTintPalette = (color, count) => {
    const scale = chroma.scale([chroma(color).darken(2.5), chroma(color).brighten(2.5)]).mode('lch');
    return scale.colors(count);
};
