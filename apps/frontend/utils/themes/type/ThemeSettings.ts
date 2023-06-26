import { ThemeMask } from "./ThemeMask";
import { ThemeTextProperties } from './ThemeTextProperties';

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
