import * as PIXI from "pixi.js";

export const handleLocalFontFamilyChange = (event, newFontFamily, setFontFamily, textName, handleFontFamilyChange) => {
    if (newFontFamily !== null) {
        setFontFamily(newFontFamily);
        handleFontFamilyChange(textName, newFontFamily);
    } else {
        setFontFamily('Arial');
        handleFontFamilyChange(textName, 'Arial');
    }
};

export const handleLocalColorChange = (event, setFill, handleColorChange) => {
    setFill(event.target.value);
    handleColorChange(event);
};

export const handleLocalFontWeightChange = (event, newFontWeight, setFontWeight, textName, handleFontWeightChange) => {
    if (newFontWeight !== null) {
        setFontWeight(newFontWeight);
        handleFontWeightChange(textName, newFontWeight);
    } else {
        setFontWeight('normal');
        handleFontWeightChange(textName, 'normal');
    }
};

export const handleLocalFontStyleChange = (event, newFontStyle, setFontStyle, textName, handleFontStyleChange, handlePaddingChange, activeCanvases, canvasApps) => {
    if (newFontStyle !== null) {
        setFontStyle(newFontStyle);
        handleFontStyleChange(textName, newFontStyle);
        if (newFontStyle === 'italic') {
            handlePaddingChange(textName, 5, activeCanvases, canvasApps);
        } else {
            handlePaddingChange(textName, 0, activeCanvases, canvasApps);
        }
    } else {
        setFontStyle('normal');
        handleFontStyleChange(textName, 'normal');
        handlePaddingChange(textName, 0, activeCanvases, canvasApps);
    }
};

export const handlePaddingChange = (textType, padding, activeCanvases, canvasApps) => {
    const activeTextStyles = Object.entries(activeCanvases)
        .filter(([canvasName, isActive]) => isActive)
        .map(([canvasName]) => {
            const canvasApp = canvasApps[canvasName];
            if (canvasApp) {
                const textObject = canvasApp.stage.getChildByName(`${canvasName}-${textType}`) as PIXI.Text;
                if (textObject) {
                    return textObject.style;
                }
            }
            return null;
        })
        .filter((style) => style !== null);

    activeTextStyles.forEach((style) => {
        style.padding = padding;
    });
}

export const handleLocalFontVariantChange = (event, newFontVariant, setFontVariant, textName, handleFontVariantChange) => {
    if (newFontVariant !== null) {
        setFontVariant(newFontVariant);
        handleFontVariantChange(textName, newFontVariant);
    } else {
        setFontVariant('normal');
        handleFontVariantChange(textName, 'normal');
    }
};

export const handleLocalLetterSpacingChange = (event, newValue, setLetterSpacing, textName, handleLetterSpacingChange) => {
    setLetterSpacing(newValue);
    handleLetterSpacingChange(textName, newValue / 100);
};
