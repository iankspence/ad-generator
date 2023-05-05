import {themes} from "../../../utils/constants/themes";

export const getSelectedTheme = (selectedThemeId) => {
    return themes.find((theme) => theme.id === selectedThemeId);
};
