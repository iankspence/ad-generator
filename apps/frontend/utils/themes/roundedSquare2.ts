import {
    Theme,
    ThemeSettings,
    ThemeMask,
    ThemeAutoColor,
    ThemeTextProperties,
    ThemeTextStyle,
} from '@monorepo/type';

const roundedSquare2: Theme = {
    id: 'rounded-square-2',
    settings: {
        shortMasks: [
            {
                name: 'rounded-square-short-base-1',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 2,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'rounded-square-short-base-2',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 0,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'rounded-square-short-base-3',
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 1,
                } as ThemeAutoColor
            } as ThemeMask,
        ],

        tallMasks: [
            {
                name: 'rounded-square-tall-base-1',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 2,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'rounded-square-tall-base-2',
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 0,
                } as ThemeAutoColor
            } as ThemeMask,
            {
                name: 'rounded-square-tall-base-3',
                autoColor: {
                    sourceType: 'grayscale',
                    paletteType: 'adjacent',
                    minMaxType: 'min',
                    minMaxDistance: 1,
                } as ThemeAutoColor
            } as ThemeMask,
        ],

        hookTextDefaults: {
            hookMainText: {
                canvasName: 'hook',
                textName: 'main',
                yRange: [215, 305],
                xRange: [15, 135],
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
                yRange: [215, 305],
                xRange: [15, 135],
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 1,
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
                yRange: [215, 305],
                xRange: [15, 135],
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
                yRange: [187, 305],
                xRange: [15, 177],
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
                yRange: [187, 305],
                xRange: [15, 177],
                autoColor: {
                    sourceType: 'primary',
                    paletteType: 'adjacent',
                    minMaxType: 'max',
                    minMaxDistance: 1,
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
                yRange: [215, 305],
                xRange: [15, 135],
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

export default roundedSquare2;
