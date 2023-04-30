import { addMaskLayer } from '../components/pixi/utils/pixi-utils';
import { PixiContext } from '../contexts/PixiContext';
import { getMasksByNames } from '../utils/api';
import { themes } from '../utils/constants/themes';
import * as PIXI from 'pixi.js';
import { useContext, useEffect, useState } from 'react';

export const useNewSelectedTheme = (app, imageUrl, selectedThemeId, canvasName, size) => {
    const [maskTextures, setMaskTextures] = useState([]);
    const {
        imageContainers,
    } = useContext(PixiContext);

    const fetchMaskTextures = async (maskNames) => {
        try {
            const masks = await getMasksByNames(maskNames);
            const textures = masks.map((mask) => {
                const svgResource = new PIXI.SVGResource(mask.maskBase64);
                const baseTexture = new PIXI.BaseTexture(svgResource);
                return new PIXI.Texture(baseTexture);
            });
            setMaskTextures(textures);
        } catch (error) {
            console.error('Error fetching masks:', error);
        }
    };

    useEffect(() => {
        if (selectedThemeId) {
            const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);
            if (selectedTheme) {
                let maskNames = [];
                if (canvasName === 'review') {
                    maskNames = selectedTheme.settings.tallMasks.map((mask) => mask.name);
                }
                if (canvasName === 'hook' || canvasName === 'claim' || canvasName === 'close') {
                    maskNames = selectedTheme.settings.shortMasks.map((mask) => mask.name);
                }
                fetchMaskTextures(maskNames).then((r) => console.log('fetchMaskTextures: ', r));
            } else {
                setMaskTextures([]);
            }
        } else {
            setMaskTextures([]);
        }
    }, [selectedThemeId, canvasName]);

    useEffect(() => {
        if (!app || !app.stage) return;

        const container = imageContainers[canvasName];
        if (!container) return;

        app.stage.removeChildren();

        app.stage.addChild(container);

        if (selectedThemeId) {
            const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);

            if (selectedTheme) {
                maskTextures.forEach((texture, index) => {
                    const masks = selectedTheme.settings.shortMasks;
                    const maskData = {
                        texture,
                        colour: masks[index].colour,
                    };
                    addMaskLayer(app, maskData, size);
                });
            }
        }
    }, [
        app,
        imageContainers,
        selectedThemeId,
        maskTextures,
        canvasName,
    ]);
};

export default useNewSelectedTheme;
