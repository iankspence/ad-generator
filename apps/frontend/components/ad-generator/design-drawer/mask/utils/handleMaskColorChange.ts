export const handleMaskColorChange = (event, maskName, updateMaskThemeOverrides, maskThemeOverrides) => {
    const newColor = event.target.value.startsWith('#')
        ? event.target.value
        : `#${event.target.value}`;

    // Create a copy of current overrides
    const newMaskThemeOverrides = {...maskThemeOverrides};

    // Change color for the specific mask
    newMaskThemeOverrides[maskName] = {
        ...newMaskThemeOverrides[maskName],
        color: newColor
    };

    // Call the updater function from context
    updateMaskThemeOverrides(newMaskThemeOverrides);
    console.log('newMaskThemeOverrides (handleMaskColorChange): ', newMaskThemeOverrides)
    console.log('color (handleMaskColorChange): ', newColor)

};
