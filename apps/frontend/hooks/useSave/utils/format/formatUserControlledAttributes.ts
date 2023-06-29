import { extractUserControlledAttributes } from '../extractUserControlledAttributes';

export const formatUserControlledAttributes = (canvasApps, backgroundImageLocation, maskThemeOverrides) => {
    const formattedApps = [];
    for(const key in canvasApps) {
        if(canvasApps[key] !== null) {
            const { childrenNames, imageControls, textControls, maskControls } = extractUserControlledAttributes(canvasApps[key], backgroundImageLocation, maskThemeOverrides);
            formattedApps.push({
                canvasName: key,
                // canvasAppStage: canvasApps[key].stage,
                childrenNames,
                imageControls,
                textControls,
                maskControls
            });
        }
    }
    return formattedApps;
};
