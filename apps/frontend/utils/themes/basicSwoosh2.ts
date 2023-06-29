import {
    Theme,
    ThemeSettings,
    ThemeMask,
    ThemeAutoColor,
    ThemeTextProperties,
    ThemeTextStyle,
} from '@monorepo/type';

const basicSwoosh2: Theme = {
    id: 'basic-swoosh-2',
    settings: {
        shortMasks: [
            {
                name: 'basic-swoosh-short-base-1',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 2,
                } as ThemeAutoColor,
            } as ThemeMask,
            {
                name: 'basic-swoosh-short-base-2',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 0,
                } as ThemeAutoColor,
            } as ThemeMask,
        ],

        tallMasks: [
            {
                name: 'basic-swoosh-tall-base-1',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 2,
                } as ThemeAutoColor,
            } as ThemeMask,
            {
                name: 'basic-swoosh-tall-base-2',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 0,
                } as ThemeAutoColor,
            } as ThemeMask,
        ],

        hookTextDefaults: {
            hookMainText: {
                canvasName: 'hook',
                textName: 'main',
                yRange: [260, 315],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 0,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                    fontStyle: "italic",
                    padding: 2,
                } as ThemeTextStyle,
            } as ThemeTextProperties,

            hookAuthorText: {
                canvasName: 'hook',
                textName: 'author',
                yRange: [260, 315],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 0,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                    fontVariant: "small-caps",
                    fontWeight: "bold",
                } as ThemeTextStyle,
            } as ThemeTextProperties,
        },

        claimTextDefaults: {
            claimMainText: {
                canvasName: 'claim',
                textName: 'main',
                yRange: [260, 315],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 0,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                } as ThemeTextStyle,
            } as ThemeTextProperties,
        },

        reviewTextDefaults: {
            reviewMainText: {
                canvasName: 'review',
                textName: 'main',
                yRange: [225, 315],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 0,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                    fontStyle: "italic",
                } as ThemeTextStyle,
            } as ThemeTextProperties,

            reviewAuthorText: {
                canvasName: 'review',
                textName: 'author',
                yRange: [225, 315],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 0,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                    fontVariant: "small-caps",
                    fontWeight: "bold",
                } as ThemeTextStyle,
            } as ThemeTextProperties,
        },

        closeTextDefaults: {
            closeMainText: {
                canvasName: 'close',
                textName: 'main',
                yRange: [260, 315],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 0,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                } as ThemeTextStyle,
            } as ThemeTextProperties,
        }
    } as ThemeSettings,
};

export default basicSwoosh2;
