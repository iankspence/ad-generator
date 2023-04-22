import { getMasksByNames } from '../../../utils/api';
import * as PIXI from 'pixi.js';
import { useEffect, useState } from 'react';

const MaskLayer = ({ key, appRef, maskName, colour }) => {
    const [maskTexture, setMaskTexture] = useState(null);

    useEffect(() => {
        const fetchMask = async () => {
            try {
                const masks = await getMasksByNames([maskName]);
                const mask = masks[0];
                const image = new Image();
                image.src = mask.maskBase64;
                image.onload = () => {
                    const baseTexture = new PIXI.BaseTexture(image);
                    const texture = new PIXI.Texture(baseTexture);
                    setMaskTexture(texture);
                };
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
void main(void)
{
   vec4 originalColor = texture2D(uSampler, vTextureCoord);
   if (originalColor.r >= 0.9 && originalColor.g >= 0.9 && originalColor.b >= 0.9) {
       gl_FragColor = vec4(1.0, 0.0, 0.0, originalColor.a);
   } else if (originalColor.r <= 0.1 && originalColor.g <= 0.1 && originalColor.b <= 0.1) {
       gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
   } else {
       gl_FragColor = originalColor;
   }
}
`;
        const colourFilter = new PIXI.Filter(null, fragment);
        mask.filters = [colourFilter];
        app.stage.addChild(mask);

        return () => {
            app.stage.removeChild(mask);
        };
    }, [appRef, maskTexture, colour]);

    return null;
};

export default MaskLayer;
