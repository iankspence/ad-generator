import React, {useState, useEffect, useContext} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as PIXI from 'pixi.js';
import {PixiContext} from "../../../../../contexts/PixiContext";
import {mode} from "../../../utils/mode";
import Grid from '@material-ui/core/Grid';
import {capitalizeFirstLetter} from "../../../utils/text/capitalizeFirstLetter";
import UserContext from "../../../../../contexts/UserContext";
import useAccount from "../../../../../hooks/useAccount";
import BoldButton from "../button/bold/BoldButton";
import SmallCapsButton from "../button/small-caps/SmallCapsButton";
import ItalicButton from "../button/italic/ItalicButton";
import LetterSpacingSlider from "../slider/LetterSpacingSlider";
import FontFamilySelector from "../selector/FontFamilySelector";
import ColorSelectionButtonGroup from "../button-group/ColorSelectionButtonGroup";

const TextStyleAccordion = ({
                                textName,
                                handleColorChange,
                                handleLetterSpacingChange
                            }) => {
    const { activeCanvases, canvasApps } = useContext(PixiContext);

    const [fontFamily, setFontFamily] = useState('Arial');
    const [fill, setFill] = useState('#000000');
    const [fontWeight, setFontWeight] = useState('normal');
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontVariant, setFontVariant] = useState('normal');
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [showPrimaryPaletteViewer, setShowPrimaryPaletteViewer] = useState(false);
    const [showSecondaryPaletteViewer, setShowSecondaryPaletteViewer] = useState(false);

    const { user } = useContext(UserContext);
    const { account } = useAccount(user?._id);

    useEffect(() => {
        const activeTextStyles = Object.entries(activeCanvases)
            .filter(([canvasName, isActive]) => isActive)
            .map(([canvasName]) => {
                const canvasApp = canvasApps[canvasName];
                if (canvasApp) {
                    const textObject = canvasApp.stage.getChildByName(`${canvasName}-${textName}`) as PIXI.Text;
                    if (textObject) {
                        return textObject.style;
                    }
                }
                return null;
            })
            .filter((style) => style !== null);

        if (activeTextStyles.length > 0) {
            const mostCommonFontFamily = mode(activeTextStyles.map((style) => style.fontFamily));
            const mostCommonFill = mode(activeTextStyles.map((style) => style.fill));
            const mostCommonFontWeight = mode(activeTextStyles.map((style) => style.fontWeight));
            const mostCommonFontStyle = mode(activeTextStyles.map((style) => style.fontStyle));
            const mostCommonFontVariant = mode(activeTextStyles.map((style) => style.fontVariant));
            const mostCommonLetterSpacing = mode(activeTextStyles.map((style) => style.letterSpacing));

            setFontFamily(mostCommonFontFamily || 'Arial');
            setFill(mostCommonFill || '#000000');
            setFontWeight(mostCommonFontWeight || 'normal');
            setFontStyle(mostCommonFontStyle || 'normal');
            setFontVariant(mostCommonFontVariant || 'normal');
            setLetterSpacing(mostCommonLetterSpacing || 0);
        }
    }, [activeCanvases, canvasApps]);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{capitalizeFirstLetter(textName)} Style</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FontFamilySelector
                    fontFamily={fontFamily}
                    setFontFamily={setFontFamily}
                    textName={textName}
                    activeCanvases={activeCanvases}
                    canvasApps={canvasApps}
                />
                <div className="py-2"></div>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <ColorSelectionButtonGroup
                            account={account}
                            fill={fill}
                            handleColorChange={handleColorChange}
                            textName={textName}
                            showPrimaryPaletteViewer={showPrimaryPaletteViewer}
                            setShowPrimaryPaletteViewer={setShowPrimaryPaletteViewer}
                            showSecondaryPaletteViewer={showSecondaryPaletteViewer}
                            setShowSecondaryPaletteViewer={setShowSecondaryPaletteViewer}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <BoldButton
                            textName={textName}
                            fontWeight={fontWeight}
                            setFontWeight={setFontWeight}
                            activeCanvases={activeCanvases}
                            canvasApps={canvasApps}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <ItalicButton
                            textName={textName}
                            fontStyle={fontStyle}
                            setFontStyle={setFontStyle}
                            activeCanvases={activeCanvases}
                            canvasApps={canvasApps}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <SmallCapsButton
                            textName={textName}
                            fontVariant={fontVariant}
                            setFontVariant={setFontVariant}
                            activeCanvases={activeCanvases}
                            canvasApps={canvasApps}
                        />
                    </Grid>
                </Grid>

                <div className="py-2"></div>
                <LetterSpacingSlider
                    textName={textName}
                    letterSpacing={letterSpacing}
                    handleLetterSpacingChange={handleLetterSpacingChange}
                    setLetterSpacing={setLetterSpacing}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default TextStyleAccordion;