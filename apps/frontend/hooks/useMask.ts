import { useContext, useEffect, useState } from 'react';
import { PixiContext } from '../contexts/PixiContext';
import { addMaskLayer } from '../components/ad-generator/utils/mask/addMaskLayer';
import { findMasksByNames } from '../utils/api/mongo/mask/findMasksByNamesApi';
import * as PIXI from 'pixi.js';
import { findMaskChildren } from '../components/ad-generator/utils/mask/findMaskChildren';
import { getSelectedTheme } from "../components/ad-generator/utils/getSelectedTheme";
import UserContext from "../contexts/UserContext";
import { generateAutoColor } from "../utils/color/generateAutoColor";
import { mode } from '../components/ad-generator/utils/mode';

const useMask = (appRef, canvasName, size) => {
    const [maskTextures, setMaskTextures] = useState([]);
    const { selectedThemeId, updateMaskLocations, maskThemeOverrides, updateMaskThemeOverrides } = useContext(PixiContext);
    const selectedTheme = getSelectedTheme(selectedThemeId);
    const { account } = useContext(UserContext)

    const fetchMaskTextures = async (maskNames) => {
        try {

            const masks = await findMasksByNames({ maskNames });
            const maskLocations = []
            const textures = await Promise.all(masks.map(async (mask) => {
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

        const oldThemeIds = [];
        // Remove existing masks (and check what themeId they had)
        const existingMasks = findMaskChildren(app);
        existingMasks.forEach((mask) => {
            oldThemeIds.push(mask.themeId);
            app.stage.removeChild(mask);
        });

        const modeOldThemeId = mode(oldThemeIds);

        if (selectedThemeId) {

            const selectedTheme = getSelectedTheme(selectedThemeId)

            if (selectedTheme) {
                let maskThemeSettings;
                if (canvasName === 'review') {
                    maskThemeSettings = selectedTheme.settings.tallMasks;
                } else {
                    maskThemeSettings = selectedTheme.settings.shortMasks;
                }

                console.log('all mask textures: ', maskTextures)
                console.log('maskThemeOverrides: ', maskThemeOverrides)
                maskTextures.forEach((texture, index) => {

                    let color;

                    if ( maskTextures.length !== maskThemeSettings.length) {
                        return
                    }

                    console.log('maskTextures count: ', maskTextures.length)

                    console.log('index: ', index)
                    console.log('length of maskThemeSettings: ', maskThemeSettings.length)

                    if (maskThemeSettings[index]) {

                        const currentMaskOverrides = maskThemeOverrides[maskThemeSettings[index].name];
                        // console.log('currentMaskOverrides: ', currentMaskOverrides)

                        if (modeOldThemeId !== selectedThemeId) { // when a new theme is selected, reset overrides and use autoColor
                            updateMaskThemeOverrides({ [maskThemeSettings[index].name]: {
                                    color: null
                                } })
                            color = generateAutoColor(maskThemeSettings[index].autoColor, account?.primaryColor, account?.secondaryColor)
                            // console.log('new theme selected, new colour: ', color)

                        } else { // if the theme is the same, use the current overrides or autoColor if there are none
                            // console.log('theme is the same, use overrides or autoColor if there are none')
                            // console.log('currentMaskOverrides: ', currentMaskOverrides)
                            if (currentMaskOverrides) {
                                // console.log('currentMaskOverrides.color: ', currentMaskOverrides.color)

                                color = currentMaskOverrides.color ? currentMaskOverrides.color : generateAutoColor(maskThemeSettings[index].autoColor, account?.primaryColor, account?.secondaryColor)
                            }
                            // console.log('color: ', color)

                        }

                        if (maskThemeSettings[index]) {
                            const maskData = {
                                name: maskThemeSettings[index].name,
                                canvasName,
                                selectedThemeId,
                                texture,
                                color
                            };

                            addMaskLayer(app, maskData, size);
                        }

                    }
                });
            }
        }

    }, [maskTextures, selectedThemeId, account, maskThemeOverrides]);
};

export default useMask;
