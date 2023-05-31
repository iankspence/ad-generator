import * as PIXI from 'pixi.js';

export interface UserControlledAttribute {
    canvasName: string,
    childrenNames: string[],
    imageControls: {
        location: string,
        x: number,
        y: number,
        scaleX: number,
        scaleY: number,
    },
    textControls: {
        name: string,
        x: number,
        y: number,
        text: string,
        style: PIXI.HTMLTextStyle,
    } [],
}
