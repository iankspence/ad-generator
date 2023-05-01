import { addMaskLayer } from '../components/pixi/utils/pixi-utils';
import { PixiContext } from '../contexts/PixiContext';
import { getMasksByNames } from '../utils/api';
import { themes } from '../utils/constants/themes';
import * as PIXI from 'pixi.js';
import { useContext, useEffect, useState } from 'react';
import {findImageContainer} from "../components/pixi/utils/find-image-container";
import {DraggableContainer} from "./useDraggable";
import findTextObject from "../components/pixi/utils/find-text-object";

export const useNewSelectedTheme = (appRef, imageUrl, selectedThemeId, canvasName, size) => {
    const [maskTextures, setMaskTextures] = useState([]);
    const { canvasApps } = useContext(PixiContext);

    const container = findImageContainer(canvasApps, canvasName) as DraggableContainer;
    const mainText = findTextObject(canvasApps[canvasName], `${canvasName}-main-text`);

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

        if (!appRef?.current || !container ) return;
        const app = appRef.current;
        if (!app?.stage || !app?.stage?.children) return;
        app.stage.removeChildren();
        app.stage.addChild(container);

        if (!mainText) return;
        app.stage.addChild(mainText);

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
        appRef,
        container,
        canvasApps,
        selectedThemeId,
        maskTextures,
        canvasName,
        mainText,
    ]);
};

export default useNewSelectedTheme;
