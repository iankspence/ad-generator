export const extractMaskColorOverrideByMaskName = (maskThemeOverrides, maskName) => {

    const maskNameWithoutPrefix = maskName.split('-').slice(2).join('-');    // remove the `mask-${canvasName}` prefix from the maskName.
    return maskThemeOverrides[maskNameWithoutPrefix].color
}
