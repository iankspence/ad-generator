import * as PIXI from "pixi.js";

export const findImageContainer = (canvasApps, canvasName) => {
    const app = canvasApps[canvasName];
    if (!app || !app.stage) return null;

    for (const child of app.stage.children) {
        if (child instanceof PIXI.Container && child.children.length === 1 && child.children[0] instanceof PIXI.Sprite && child.name.split('-')[0] === "image") {
            return child;
        }
    }

    return null;
};
