import * as PIXI from 'pixi.js';

export const findMaskChildren = (app) => {
    if (!app || !app.stage) return [];

    const maskChildren = [];

    for (const child of app.stage.children) {
        if (child instanceof PIXI.Sprite && child.texture.baseTexture.resource instanceof PIXI.SVGResource) {
            maskChildren.push(child);
        }
    }

    return maskChildren;
};
