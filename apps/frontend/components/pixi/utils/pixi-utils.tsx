import * as PIXI from 'pixi.js';

export const addImageLayer = (app, imageUrl) => {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    const image = PIXI.Sprite.from(imageUrl);
    image.anchor.set(0.5);

    image.x = app.screen.width / 2;
    image.y = app.screen.height / 2;
    image.eventMode = 'static';

    image.zIndex = 0;
    container.addChild(image);
};

export const addMaskLayer = (app, maskData) => {
    const { texture, colour } = maskData;
    const mask = new PIXI.Sprite(texture);
    mask.anchor.set(0.5);

    mask.x = app.screen.width / 2;
    mask.y = app.screen.height / 2;

    mask.zIndex = 1;

    const scaleFactor = 400 / 1080;
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

    console.log('Texture:', texture);
    console.log('Mask sprite:', mask);
    // console.log('Filter properties:', colourFilter);

    app.stage.addChild(mask);
};

export const addTextLayer = (app, textData) => {
    const { text, style } = textData;

    const textLayer = new PIXI.Text(text, style);
    textLayer.anchor.set(0.5);

    textLayer.x = app.screen.width / 2;
    textLayer.y = app.screen.height / 2;

    app.stage.addChild(textLayer);
};
