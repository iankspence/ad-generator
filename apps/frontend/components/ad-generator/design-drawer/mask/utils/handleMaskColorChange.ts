export const handleMaskColorChange = (event, maskName, updateMaskThemeOverrides, maskThemeOverrides) => {
    const newColor = event.target.value.startsWith('#')
        ? event.target.value
        : `#${event.target.value}`;

    const newMaskThemeOverrides = {...maskThemeOverrides};

    newMaskThemeOverrides[maskName] = {
        ...newMaskThemeOverrides[maskName],
        color: newColor
    };

    updateMaskThemeOverrides(newMaskThemeOverrides);
};
