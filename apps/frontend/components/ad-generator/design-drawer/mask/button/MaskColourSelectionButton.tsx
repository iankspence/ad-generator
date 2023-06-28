import { PixiContext } from "../../../../../contexts/PixiContext";
import { useContext, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { handleMaskColorChange } from "../utils/handleMaskColorChange";
import { ColorDisplayButton, ColorSelectionButtonInput } from "../../text-style/button/colour-selection/ColorSelectionButton";

const MaskColorSelectionButton = ({ fill, setFill, maskName }) => {
    const pickerRef = useRef(null);

    const { activeCanvases, canvasApps, maskThemeOverrides, updateMaskThemeOverrides } = useContext(PixiContext);

    const handleChange = (event) => {
        handleMaskColorChange(event, maskName, updateMaskThemeOverrides, maskThemeOverrides);
    };

    const handleClick = () => {
        pickerRef.current.click();
    };

    // useEffect(() => {
    //     // Execute the handleChange function when necessary dependencies change
    // }, [setFill, fill, activeCanvases, canvasApps]);

    return (
        <Box>
            <ColorDisplayButton
                color={fill || "#000000"} // Add a default color here
                onClick={handleClick}
            />
            <ColorSelectionButtonInput
                type="color"
                ref={pickerRef}
                onChange={handleChange}
                value={fill || "#000000"} // And here
            />

        </Box>
    );
};

export default MaskColorSelectionButton;
