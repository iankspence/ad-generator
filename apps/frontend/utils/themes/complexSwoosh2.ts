import {
    Theme,
    ThemeSettings,
    ThemeMask,
    ThemeAutoColor,
    ThemeTextProperties,
    ThemeTextStyle,
} from '@monorepo/type';

const complexSwoosh2: Theme = {
    id: 'complex-swoosh-2',
    settings: {
        shortMasks: [
            {
                name: 'complex-swoosh-short-base-1',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 0,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'complex-swoosh-short-base-2',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 2,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'complex-swoosh-short-base-3',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 0,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'complex-swoosh-short-base-4',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 2,
                } as ThemeAutoColor
            } as ThemeMask,
        ],

        tallMasks: [
            {
                name: 'complex-swoosh-tall-base-1',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 0,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'complex-swoosh-tall-base-2',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 2,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'complex-swoosh-tall-base-3',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 0,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'complex-swoosh-tall-base-4',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 2,
                } as ThemeAutoColor
            } as ThemeMask,
        ],
        hookTextDefaults: {
            hookMainText: {
                canvasName: 'hook',
                textName: 'main',
                yRange: [10, 75],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 1,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                    fontStyle: "italic",
                    padding: 2,
                } as ThemeTextStyle
            } as ThemeTextProperties,

            hookAuthorText: {
                canvasName: 'hook',
                textName: 'author',
                yRange: [10, 75],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'primary',
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
                } as ThemeTextStyle
            } as ThemeTextProperties,
        },

        claimTextDefaults: {
            claimMainText: {
                canvasName: 'claim',
                textName: 'main',
                yRange: [10, 75],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 1,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                } as ThemeTextStyle
            } as ThemeTextProperties,
        },

        reviewTextDefaults: {
            reviewMainText: {
                canvasName: 'review',
                textName: 'main',
                yRange: [15, 115],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 1,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                    fontStyle: "italic",
                } as ThemeTextStyle
            } as ThemeTextProperties,

            reviewAuthorText: {
                canvasName: 'review',
                textName: 'author',
                yRange: [15, 115],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'primary',
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
                } as ThemeTextStyle
            } as ThemeTextProperties,
        },

        closeTextDefaults: {
            closeMainText: {
                canvasName: 'close',
                textName: 'main',
                yRange: [10, 75],
                xRange: [15, 305],
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 1,
                } as ThemeAutoColor,
                style: {
                    fontFamily: "Arial",
                    fill: "white",
                    wordWrap: true,
                    align: "left",
                } as ThemeTextStyle
            } as ThemeTextProperties,
        }
    } as ThemeSettings
}

export default complexSwoosh2;
