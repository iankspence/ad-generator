import { extractUserControlledAttributes } from './extractUserControlledAttributes';

export const formatUserControlledAttributes = (canvasApps, backgroundImageLocation) => {
    const formattedApps = [];
    for(const key in canvasApps) {
        if(canvasApps[key] !== null) {
            const { childrenNames, imageControls, textControls } = extractUserControlledAttributes(canvasApps[key], backgroundImageLocation);
            formattedApps.push({
                canvasName: key,
                // canvasAppStage: canvasApps[key].stage,
                childrenNames: childrenNames,
                imageControls: imageControls,
                textControls: textControls
            });
        }
    }
    return formattedApps;
};
