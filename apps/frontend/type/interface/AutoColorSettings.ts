export interface AutoColorSettings {
    sourceType: 'primary' | 'secondary',
    paletteType: 'adjacent' | 'split-complementary-1' | 'split-complementary-2',
    minMaxType: 'min' | 'max',
    minMaxDistance: number,
}
