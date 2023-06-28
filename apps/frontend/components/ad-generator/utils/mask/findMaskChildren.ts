import * as PIXI from 'pixi.js';
import { ThemeSprite } from '../../../../type/ThemeSprite';

export const findMaskChildren = (app: PIXI.Application) => {
    if (!app || !app.stage) return [];

    const maskChildren = [];

    for (const child of app.stage.children) {
        if (child instanceof ThemeSprite && child.texture.baseTexture.resource instanceof PIXI.SVGResource) {
            maskChildren.push(child);
        }
    }

    return maskChildren;
};
