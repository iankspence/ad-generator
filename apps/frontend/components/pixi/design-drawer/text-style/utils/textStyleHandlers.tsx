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
