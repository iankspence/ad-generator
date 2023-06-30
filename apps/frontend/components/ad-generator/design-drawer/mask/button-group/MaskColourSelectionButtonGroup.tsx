import { PixiContext } from "../../../../../contexts/PixiContext";
import { useContext, useRef } from "react";
import { Box, Button, Grid } from '@mui/material';
import { handleMaskColorChange } from "../utils/handleMaskColorChange";
import { ColorDisplayButton, ColorSelectionButtonInput } from "../../text-style/button/colour-selection/ColorSelectionButton";
import UserContext from "../../../../../contexts/UserContext";
import { generateAutoColor } from "../../../../../utils/color/generateAutoColor";
import { getSelectedTheme } from '../../../utils/getSelectedTheme';
import { generateColorPalettes } from '../../../../../utils/color/generateColorPalettes';
import { MaskPaletteColorSelectionButton } from "../button/MaskPaletteColorSelectionButton";

const MaskColorSelectionButtonGroup = ({ maskName }) => {
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
            color: null,
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

    // Calculate autoColor for display
    const autoColor = maskThemeOverrides[maskName].color
        ? maskThemeOverrides[maskName].color
        : generateAutoColor(maskThemeAutoColor, account?.primaryColor, account?.secondaryColor)

    const primaryColorPalettes = generateColorPalettes(account?.primaryColor);
    const secondaryColorPalettes = generateColorPalettes(account?.secondaryColor);
    const grayscaleColorPalettes = generateColorPalettes('#808080');

    return (
        <Box sx={{ display: 'flex' }}>
            <Box>
                <Grid container direction="column" spacing={1}>
                    <Grid item container direction="row" justifyContent="space-between">
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
                        <div className="w-4"></div>

                        <MaskPaletteColorSelectionButton
                            handleChange={handleChange}
                            colorPalettes={grayscaleColorPalettes}
                        />
                    </Grid>

                    <Grid item container direction="row" justifyContent="space-between">

                        <MaskPaletteColorSelectionButton
                            handleChange={handleChange}
                            colorPalettes={primaryColorPalettes}
                        />
                        <MaskPaletteColorSelectionButton
                            handleChange={handleChange}
                            colorPalettes={secondaryColorPalettes}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Button sx={{ marginLeft: 'auto' }} onClick={handleReset}>Reset</Button>
        </Box>
    );
};

export default MaskColorSelectionButtonGroup;
