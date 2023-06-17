import * as PIXI from "pixi.js";

export const handlePaddingChange = (textType, padding, activeCanvases, canvasApps) => {
    const activeTextStyles = Object.entries(activeCanvases)
        .filter(([canvasName, isActive]) => isActive)
        .map(([canvasName]) => {
            const canvasApp = canvasApps[canvasName];
            if (canvasApp) {
                const textObject = canvasApp.stage.getChildByName(`${canvasName}-${textType}`) as PIXI.Text;
                if (textObject) {
                    return textObject.style;
                }
            }
            return null;
        })
        .filter((style) => style !== null);

    activeTextStyles.forEach((style) => {
        style.padding = padding;
    });
}
