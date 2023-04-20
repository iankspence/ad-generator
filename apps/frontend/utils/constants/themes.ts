import { BasicSwooshTheme, SkyBubblesCenterTextTheme } from '@monorepo/type';

export const THEME_NAMES = ['skyBubblesCenterText', 'fullImageBackground', 'basicSwoosh'];

export const defaultSkyBubblesTheme: SkyBubblesCenterTextTheme = {
    gradientColors: {
        color1: '#00b4db',
        color2: '#0083b0',
    },
    bubbleCount: 50,
    minSize: 10,
    maxSize: 50,
};

export const defaultBasicSwooshTheme: BasicSwooshTheme = {
    gradientColors: {
        color1: '#00b4db',
        color2: '#0083b0',
    },
    maskOneBase64: '',
    maskTwoBase64: '',
    maskOneOpacity: 0.5,
    maskTwoOpacity: 0.5,
};
