import { useContext, useEffect, useState } from 'react';
import { PixiContext } from '../contexts/PixiContext';
import { addMaskLayer } from '../components/pixi/utils/addMaskLayer';
import { getMasksByNames } from '../utils/api';
import * as PIXI from 'pixi.js';
import { findMaskChildren } from '../components/pixi/utils/findMaskChildren';
import {getSelectedTheme} from "../components/pixi/utils/getSelectedTheme";
import UserContext from "../contexts/UserContext";
import {generateAutoColor} from "../utils/generateAutoColor";

const useMask = (appRef, canvasName, size) => {
    const [maskTextures, setMaskTextures] = useState([]);
    const { selectedThemeId } = useContext(PixiContext);
    const selectedTheme = getSelectedTheme(selectedThemeId);
    const { account } = useContext(UserContext)

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
        if (selectedTheme) {
                let maskNames = [];
                if (canvasName === 'review') {
                    maskNames = selectedTheme.settings.tallMasks.map((mask) => mask.name);
                }
                if (canvasName === 'hook' || canvasName === 'claim' || canvasName === 'close') {
                    maskNames = selectedTheme.settings.shortMasks.map((mask) => mask.name);
                }
                fetchMaskTextures(maskNames);
            }
        else {
            setMaskTextures([]);
        }
        },[canvasName, selectedThemeId]);


    useEffect(() => {
        if (!appRef?.current || !maskTextures || !account ) return;

        const app = appRef.current;
        if (!app || !app.stage) return;

        // Remove existing masks
        const existingMasks = findMaskChildren(app);
        existingMasks.forEach((mask) => {
            app.stage.removeChild(mask);
        });

        if (selectedThemeId) {
            const selectedTheme = getSelectedTheme(selectedThemeId)

            if (selectedTheme) {
                let masks;
                if (canvasName === 'review') {
                    masks = selectedTheme.settings.tallMasks;
                } else {
                    masks = selectedTheme.settings.shortMasks;
                }

                maskTextures.forEach((texture, index) => {

                    const maskData = {
                        texture,
                        color: generateAutoColor(masks[index].autoColor, account?.primaryColor, account?.secondaryColor)
                    };
                    addMaskLayer(app, maskData, size);
                });
            }
        }

    }, [maskTextures, selectedThemeId, account]);
};

export default useMask;
