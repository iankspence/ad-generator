import { ThemeMask } from "./theme-mask";
import { ThemeTextProperties } from './theme-text-properties';

export interface ThemeSettings {
    shortMasks: ThemeMask[];
    tallMasks: ThemeMask[];
    hookTextDefaults: {
        hookMainText: ThemeTextProperties,
        hookAuthorText: ThemeTextProperties,
    }
    claimTextDefaults: {
        claimMainText: ThemeTextProperties,
    };
    reviewTextDefaults: {
        reviewMainText: ThemeTextProperties,
        reviewAuthorText: ThemeTextProperties,
    }
    closeTextDefaults: {
        closeMainText: ThemeTextProperties,
    }
}
