import * as PIXI from "pixi.js";

export const handleTextStyleChange = (textName, newTextStyle, activeCanvases, canvasApps) => {

    Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
        if (isActive) {
            const canvasApp = canvasApps[canvasName];
            if (canvasApp) {
                const textObject = canvasApp.stage.getChildByName(`text-${canvasName}-${textName}`) as PIXI.HTMLText;
                if (textObject) {
                    Object.assign(textObject.style, newTextStyle);
                }
            }
        }
    });
};
