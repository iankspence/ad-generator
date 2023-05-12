import chroma from 'chroma-js';

export const generateSplitComplementaryColours = (colour) => {
    const hclColour = chroma(colour).hcl();
    const splitComplementaryHue1 = (hclColour[0] + 150) % 360;
    const splitComplementaryHue2 = (hclColour[0] + 210) % 360;
    return [
        chroma.hcl(splitComplementaryHue1, hclColour[1], hclColour[2]),
        chroma.hcl(splitComplementaryHue2, hclColour[1], hclColour[2]),
    ];
};
