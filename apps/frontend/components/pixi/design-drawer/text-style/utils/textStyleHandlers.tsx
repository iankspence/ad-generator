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


export const handleLocalLetterSpacingChange = (event, newValue, setLetterSpacing, textName, handleLetterSpacingChange) => {
    setLetterSpacing(newValue);
    handleLetterSpacingChange(textName, newValue / 100);
};
