import {themes} from "../../../utils/themes/themes";

export const getSelectedTheme = (selectedThemeId) => {
    return themes.find((theme) => theme.id === selectedThemeId);
};
