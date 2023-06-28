import { PixiContext } from "../../../../../contexts/PixiContext";
import { useContext, useRef } from "react";
import { Box, Button } from "@mui/material";
import { handleMaskColorChange } from "../utils/handleMaskColorChange";
import { ColorDisplayButton, ColorSelectionButtonInput } from "../../text-style/button/colour-selection/ColorSelectionButton";
import UserContext from "../../../../../contexts/UserContext";
import { generateAutoColor } from "../../../../../utils/color/generateAutoColor";
import { getSelectedTheme } from '../../../utils/getSelectedTheme';

const MaskColorSelectionButton = ({ maskName }) => {
    const pickerRef = useRef(null);

    const { maskThemeOverrides, updateMaskThemeOverrides, selectedThemeId } = useContext(PixiContext);
    const { account } = useContext(UserContext);

    const handleChange = (event) => {
        handleMaskColorChange(event, maskName, updateMaskThemeOverrides, maskThemeOverrides);
    };

    const handleReset = () => {
        const newMaskThemeOverrides = {...maskThemeOverrides};

        newMaskThemeOverrides[maskName] = {
            ...newMaskThemeOverrides[maskName],
            color: null
        };

        updateMaskThemeOverrides(newMaskThemeOverrides);
    };

    const handleClick = () => {
        pickerRef.current.click();
    };


    let maskThemeSettings;

    const selectedTheme = getSelectedTheme(selectedThemeId)

    if (maskName.includes('tall')) {
        maskThemeSettings = selectedTheme.settings.tallMasks;
    } else {
        maskThemeSettings = selectedTheme.settings.shortMasks;
    }

    const maskThemeAutoColor = maskThemeSettings.map((maskThemeSetting) => {
        if (maskThemeSetting.name == maskName) {
            return maskThemeSetting.autoColor
        }
    }).filter((maskThemeAutoColor) => maskThemeAutoColor)[0]

    console.log('maskThemeAutoColor', maskThemeAutoColor)

    // Calculate autoColor for display
    const autoColor = maskThemeOverrides[maskName].color
        ? maskThemeOverrides[maskName].color
        : generateAutoColor(maskThemeAutoColor, account?.primaryColor, account?.secondaryColor)

    return (
        <Box>
            <ColorDisplayButton
                color={autoColor || '#000000'}
                onClick={handleClick}
            />

            <ColorSelectionButtonInput
                type="color"
                ref={pickerRef}
                onChange={handleChange}
                value={autoColor || '#000000'}
            />

            <Button onClick={handleReset}>Reset</Button>
        </Box>
    );
};

export default MaskColorSelectionButton;
