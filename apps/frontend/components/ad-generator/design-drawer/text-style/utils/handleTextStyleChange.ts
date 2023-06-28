import { HtmlThemeText } from '../../../../../type/HtmlThemeText';

export const handleTextStyleChange = (textName, newTextStyle, activeCanvases, canvasApps) => {

    Object.entries(activeCanvases).forEach(([canvasName, isActive]) => {
        if (isActive) {
            const canvasApp = canvasApps[canvasName];
            if (canvasApp) {
                const textObject = canvasApp.stage.getChildByName(`text-${canvasName}-${textName}`) as HtmlThemeText;
                if (textObject) {
                    Object.assign(textObject.style, newTextStyle);
                }
            }
        }
    });
};
