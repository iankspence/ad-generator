import { extractMaskColorOverrideByMaskName } from './format/extractMaskThemeOverrides';

export const extractUserControlledAttributes = (app, backgroundImageLocation, maskThemeOverrides) => {
    const childrenNames = [];
    let imageControls;
    const textControls = [];
    const maskControls = [];

    app.stage.children.forEach(child => {
        childrenNames.push(child.name);
        if (child.name.split('-')[0] === 'image') {
            imageControls= {
                x: child.x,
                y: child.y,
                scaleX: child.scale.x,
                scaleY: child.scale.y,
                location: backgroundImageLocation
            }
        } else if (child.name.split('-')[0] === 'text') {
            const textControl = {
                name: child.name,
                x: child.x,
                y: child.y,
                text: child.text,
                style: child.style
            }
            textControls.push(textControl);
        } else if (child.name.split('-')[0] === 'mask') {
            const maskControl = {
                name: child.name,
                color: extractMaskColorOverrideByMaskName(maskThemeOverrides, child.name),
            }
            maskControls.push(maskControl);
        }
    });

    return {childrenNames, imageControls, textControls, maskControls};
};
