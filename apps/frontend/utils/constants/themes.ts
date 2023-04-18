import { SkyBubblesCenterTextTheme } from '@monorepo/type';

export const THEME_NAMES = ['skyBubblesCenterText', 'fullImageBackground'];

export const defaultSkyBubblesTheme: SkyBubblesCenterTextTheme = {
    gradientColors: {
        color1: '#00b4db',
        color2: '#0083b0',
    },
    bubbleCount: 50,
    minSize: 10,
    maxSize: 50,
};
