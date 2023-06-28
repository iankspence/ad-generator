import { HtmlThemeText } from '../../../../type/HtmlThemeText';

const findTextObject = (canvasApp, objectName) => {
    if (!canvasApp || !canvasApp.stage || !objectName) return null;

    for (let i = 0; i < canvasApp.stage.children.length; i++) {
        const child = canvasApp.stage.children[i] as HtmlThemeText;
        if (child.name === objectName) {
            return child;
        }
    }

    return null;
};

export default findTextObject;
