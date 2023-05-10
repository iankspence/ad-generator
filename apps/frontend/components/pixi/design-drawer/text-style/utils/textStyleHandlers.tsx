

export const handleLocalColorChange = (event, setFill, handleColorChange) => {
    setFill(event.target.value);
    handleColorChange(event);
};


export const handleLocalLetterSpacingChange = (event, newValue, setLetterSpacing, textName, handleLetterSpacingChange) => {
    setLetterSpacing(newValue);
    handleLetterSpacingChange(textName, newValue / 100);
};
