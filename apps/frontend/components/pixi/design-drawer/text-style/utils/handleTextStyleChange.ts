import * as PIXI from "pixi.js";

export const handleTextStyleChange = (textName, newTextStyle, activeCanvases, canvasApps) => {

    Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
        if (isActive) {
            const canvasApp = canvasApps[canvasName];
            if (canvasApp) {
                const textObject = canvasApp.stage.getChildByName(`${canvasName}-${textName}`) as PIXI.Text;
                if (textObject) {
                    Object.assign(textObject.style, newTextStyle);
                }
            }
        }
    });
};
