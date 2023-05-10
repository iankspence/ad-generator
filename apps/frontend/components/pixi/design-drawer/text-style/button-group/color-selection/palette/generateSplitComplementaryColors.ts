import chroma from 'chroma-js';

export const generateSplitComplementaryColors = (color) => {
    const hclColor = chroma(color).hcl();
    const splitComplementaryHue1 = (hclColor[0] + 150) % 360;
    const splitComplementaryHue2 = (hclColor[0] + 210) % 360;
    return [
        chroma.hcl(splitComplementaryHue1, hclColor[1], hclColor[2]),
        chroma.hcl(splitComplementaryHue2, hclColor[1], hclColor[2]),
    ];
};
