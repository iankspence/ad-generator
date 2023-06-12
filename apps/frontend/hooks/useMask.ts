import { useContext, useEffect, useState } from 'react';
import { PixiContext } from '../contexts/PixiContext';
import { addMaskLayer } from '../components/pixi/utils/addMaskLayer';
import { findMasksByNames } from '../utils/api/mongo/mask/findMasksByNamesApi';
import * as PIXI from 'pixi.js';
import { findMaskChildren } from '../components/pixi/utils/findMaskChildren';
import { getSelectedTheme } from "../components/pixi/utils/getSelectedTheme";
import UserContext from "../contexts/UserContext";
import { generateAutoColor } from "../utils/color/generateAutoColor";

const useMask = (appRef, canvasName, size) => {
    const [maskTextures, setMaskTextures] = useState([]);
    const { selectedThemeId, updateMaskLocations } = useContext(PixiContext);
    const selectedTheme = getSelectedTheme(selectedThemeId);
    const { account } = useContext(UserContext)

    const fetchMaskTextures = async (maskNames) => {
        try {

            const masks = await findMasksByNames({ maskNames });
            const maskLocations = []
            const textures = await Promise.all(masks.map(async (mask) => {
                console.log(`${process.env.NEXT_PUBLIC_CF_DOMAIN}/${mask.maskLocation}`)
                const resource = await PIXI.autoDetectResource(`${process.env.NEXT_PUBLIC_CF_DOMAIN}/${mask.maskLocation}`).load();
                const baseTexture = new PIXI.BaseTexture(resource);

                maskLocations.push({
                    maskName: mask.maskName,
                    maskLocation: mask.maskLocation,
                })
                return new PIXI.Texture(baseTexture);
            }));
            setMaskTextures(textures);

            updateMaskLocations(maskLocations);

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
                    if (masks[index]) {
                        const maskData = {
                            name: masks[index].name,
                            canvasName,
                            texture,
                            color: generateAutoColor(masks[index].autoColor, account?.primaryColor, account?.secondaryColor)
                        };
                        addMaskLayer(app, maskData, size);
                    }
                });
            }
        }

    }, [maskTextures, selectedThemeId, account]);
};

export default useMask;
