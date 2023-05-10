import * as PIXI from 'pixi.js';

export const addMaskLayer = (app, maskData, size) => {
    const { texture, colour } = maskData;
    const mask = new PIXI.Sprite(texture);
    mask.anchor.set(0.5);

    mask.x = app.screen.width / 2;
    mask.y = app.screen.height / 2;

    mask.zIndex = 1;

    const scaleFactor = size / 1080;
    mask.scale.set(scaleFactor);

    const fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 uColour;

void main(void)
{
    vec4 originalColor = texture2D(uSampler, vTextureCoord);
    float alpha = smoothstep(0.3, 0.7, originalColor.r);
    gl_FragColor = mix(vec4(0.0, 0.0, 0.0, 0.0), vec4(uColour.rgb, 1.0), alpha);
}
`;
    const colourFilter = new PIXI.Filter(null, fragment, { uColour: new PIXI.Color(colour).toRgbArray() });
    mask.filters = [colourFilter];

    app.stage.addChild(mask);
};
