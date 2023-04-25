import { getMasksByNames } from '../../../utils/api';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';

const MaskLayer = ({ appRef, maskName, colour }) => {
    const [maskTexture, setMaskTexture] = useState(null);

    useEffect(() => {
        const fetchMask = async () => {
            try {
                const masks = await getMasksByNames([maskName]);
                const mask = masks[0];

                const svgResource = new PIXI.SVGResource(mask.maskBase64);
                const baseTexture = new PIXI.BaseTexture(svgResource);
                const texture = new PIXI.Texture(baseTexture);
                setMaskTexture(texture);
            } catch (error) {
                console.error('Error fetching mask:', error);
            }
        };

        if (maskName) {
            fetchMask();
        }
    }, [maskName]);

    useEffect(() => {
        const app = appRef.current;
        if (!app || !maskTexture) return;

        const mask = new PIXI.Sprite(maskTexture);
        mask.anchor.set(0.5);
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

        return () => {
            app.stage?.removeChild(mask);
        };
    }, [appRef, maskTexture, colour]);

    return null;
};

export default MaskLayer;
