

export const handleLocalColorChange = (event, setFill, handleColorChange) => {
    setFill(event.target.value);
    handleColorChange(event);
};


