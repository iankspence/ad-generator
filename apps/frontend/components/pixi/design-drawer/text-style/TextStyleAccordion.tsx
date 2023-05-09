import React, {useState, useEffect, useContext} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    Select,
    MenuItem,
    Slider
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as PIXI from 'pixi.js';
import {PixiContext} from "../../../../contexts/PixiContext";
import {mode} from "../../utils/mode";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';
import Grid from '@material-ui/core/Grid';
import {capitalizeFirstLetter} from "../../utils/text/capitalizeFirstLetter";
import UserContext from "../../../../contexts/UserContext";
import useAccount from "../../../../hooks/useAccount";
import {
    handleLocalFontChange,
    handleLocalColorChange,
    handleLocalFontWeightChange,
    handleLocalFontStyleChange,
    handlePaddingChange,
    handleLocalFontVariantChange,
    handleLocalLetterSpacingChange
} from '../../utils/text/textStyleHandlers';
import ColorPaletteViewer from './ColorPaletteViewer'; // Import the new ColorPaletteViewer component
import PaletteIcon from '@mui/icons-material/Palette';
import Button from "@mui/material/Button";
import chroma from 'chroma-js';

const TextStyleAccordion = ({
                                textName,
                                handleFontChange,
                                handleColorChange,
                                handleFontWeightChange,
                                handleFontStyleChange,
                                handleFontVariantChange,
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

            setFontFamily(mostCommonFontFamily || 'Arial');
            setFill(mostCommonFill || '#000000');
            setFontWeight(mostCommonFontWeight || 'normal');
        }
    }, [activeCanvases, canvasApps]);

    const generateColorPalettes = (inputColor) => {
        const generateShades = (color, count) => {
            const scale = chroma.scale([chroma(color).darken(2.5), chroma(color).brighten(2.5)]).mode('lch');
            return scale.colors(count);
        };

        const splitComplementaryColors = (color) => {
            const hclColor = chroma(color).hcl();
            const splitComplementaryHue1 = (hclColor[0] + 150) % 360;
            const splitComplementaryHue2 = (hclColor[0] + 210) % 360;
            return [
                chroma.hcl(splitComplementaryHue1, hclColor[1], hclColor[2]),
                chroma.hcl(splitComplementaryHue2, hclColor[1], hclColor[2]),
            ];
        };

        const inputShades = generateShades(inputColor, 8);

        const [inputSplit1, inputSplit2] = splitComplementaryColors(inputColor);

        const inputSplit1Shades = generateShades(inputSplit1, 8);
        const inputSplit2Shades = generateShades(inputSplit2, 8);

        return [
            inputSplit1Shades,
            inputSplit2Shades,
            inputShades,
        ];
    };

    if (!account || !account?.primaryColor  || !account?.secondaryColor ) {
        return null;
    }

    const primaryColorPalettes = generateColorPalettes(account?.primaryColor);
    const secondaryColorPalettes = generateColorPalettes(account?.secondaryColor);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{capitalizeFirstLetter(textName)} Style</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl fullWidth>
                    <Select
                        value={fontFamily}
                        name={textName}
                        onChange={(event) => handleLocalFontChange(event, setFontFamily, handleFontChange)}
                    >
                        <MenuItem value="Arial Narrow">Arial Narrow</MenuItem>
                        <MenuItem value="Arial">Arial</MenuItem>
                        <MenuItem value="Arial Black">Arial Black</MenuItem>
                        <MenuItem value="Helvetica">Helvetica</MenuItem>
                        <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                        <MenuItem value="Georgia">Georgia</MenuItem>
                        <MenuItem value="Verdana">Verdana</MenuItem>
                        <MenuItem value="Trebuchet MS">Trebuchet MS</MenuItem>
                        <MenuItem value="Tahoma">Tahoma</MenuItem>
                        <MenuItem value="sans-serif">sans-serif</MenuItem>
                        <MenuItem value="serif">serif</MenuItem>
                        <MenuItem value="Hoefler Text">Hoefler Text</MenuItem>
                    </Select>
                </FormControl>
                <div className="py-2"></div>


                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={3}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <input
                                    style={{ height: '20px', width: '100%' }}
                                    type="color"
                                    value={fill}
                                    onChange={(event) =>
                                        handleLocalColorChange(event, setFill, handleColorChange)
                                    }
                                    name={textName}
                                />
                            </Grid>
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            style={{
                                                minWidth: '100%',
                                                height: '20px',
                                                padding: 0,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onClick={() => setShowPrimaryPaletteViewer(!showPrimaryPaletteViewer)}
                                        >
                                            <PaletteIcon style={{ fontSize: '1rem' }} />
                                        </Button>
                                        {showPrimaryPaletteViewer && (
                                            <ColorPaletteViewer
                                                palettes={primaryColorPalettes}
                                                handleClose={() => setShowPrimaryPaletteViewer(false)}
                                                handleColorChange={(event) =>
                                                    handleLocalColorChange(
                                                        event,
                                                        setFill,
                                                        handleColorChange
                                                    )
                                                }
                                                name={textName}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            style={{
                                                minWidth: '100%',
                                                height: '20px',
                                                padding: 0,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onClick={() => setShowSecondaryPaletteViewer(!showSecondaryPaletteViewer)}
                                        >
                                            <PaletteIcon style={{ fontSize: '1rem' }} />
                                        </Button>
                                        {showSecondaryPaletteViewer && (
                                            <ColorPaletteViewer
                                                palettes={secondaryColorPalettes}
                                                handleClose={() => setShowSecondaryPaletteViewer(false)}
                                                handleColorChange={(event) =>
                                                    handleLocalColorChange(
                                                        event,
                                                        setFill,
                                                        handleColorChange
                                                    )
                                                }
                                                name={textName}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>



                    <Grid item xs={2}>
                        <ToggleButtonGroup
                            value={fontWeight}
                            exclusive
                            onChange={(event, newFontWeight) => handleLocalFontWeightChange(event, newFontWeight, setFontWeight, textName, handleFontWeightChange)}
                            aria-label="text weight"
                        >
                            <ToggleButton value="bold" aria-label="bold">
                                <FormatBoldIcon style={{fontSize: 36}} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>

                    <Grid item xs={2}>
                        <ToggleButtonGroup
                            value={fontStyle}
                            exclusive
                            onChange={(event, newFontStyle) => handleLocalFontStyleChange(event, newFontStyle, setFontStyle, textName, handleFontStyleChange, handlePaddingChange, activeCanvases, canvasApps)}
                            aria-label="text style"
                        >
                            <ToggleButton value="italic" aria-label="italic">
                                <FormatItalicIcon style={{fontSize: 36}} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>

                    <Grid item xs={3}>
                        <ToggleButtonGroup
                            value={fontVariant}
                            exclusive
                            onChange={(event, newFontVariant) => handleLocalFontVariantChange(event, newFontVariant, setFontVariant, textName, handleFontVariantChange)}
                            aria-label="text variant"
                        >
                            <ToggleButton value="small-caps" aria-label="small-caps">
                                <KeyboardCapslockIcon style={{fontSize: 36}} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>

                <div className="py-2"></div>


                <Typography id="letter-spacing-slider" gutterBottom>
                    Letter Spacing
                </Typography>
                <Slider
                    value={letterSpacing}
                    onChange={(event, newValue) => handleLocalLetterSpacingChange(event, newValue, setLetterSpacing, textName, handleLetterSpacingChange )}
                    aria-labelledby="letter-spacing-slider"
                    valueLabelDisplay="auto"
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default TextStyleAccordion;
