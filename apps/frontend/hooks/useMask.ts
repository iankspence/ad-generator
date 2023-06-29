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
    const { selectedThemeId, updateMaskLocations, maskThemeOverrides, updateMaskThemeOverrides, editAd, freezeEditAdAttributes } = useContext(PixiContext);
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

                maskTextures.forEach((texture, index) => {
                    if ( maskTextures.length !== maskThemeSettings.length) {
                        return
                    }

                    let color;
                    if (maskThemeSettings[index]) {

                        const currentMaskOverrides = maskThemeOverrides[maskThemeSettings[index].name];

                        if (modeOldThemeId !== selectedThemeId) { // when a new theme is selected, reset overrides and use autoColor
                            updateMaskThemeOverrides({ [maskThemeSettings[index].name]: {
                                    color: null
                                }
                            })
                            color = generateAutoColor(maskThemeSettings[index].autoColor, account?.primaryColor, account?.secondaryColor)

                        } else { // if the theme is the same, use the current overrides or autoColor if there are none
                            if (currentMaskOverrides) {
                                color = currentMaskOverrides.color ? currentMaskOverrides.color : generateAutoColor(maskThemeSettings[index].autoColor, account?.primaryColor, account?.secondaryColor)
                            }
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

        if (editAd && freezeEditAdAttributes && editAd?.userControlledAttributes[0]?.maskControls ) {
            const {maskControls} = editAd.userControlledAttributes.find(attribute => attribute.canvasName === canvasName)
            const maskChildren = findMaskChildren(app);

            maskChildren.forEach((mask) => {
                const maskControl = maskControls.find(control => control.name.split('-').slice(2).join('-') === mask.name.split('-').slice(2).join('-'))
                if (maskControl?.color) {
                    updateMaskThemeOverrides({ [mask.name.split('-').slice(2).join('-')]: {
                            color: maskControl.color
                        }
                    })
                }
            })
        }

    }, [maskTextures, selectedThemeId, account, (editAd && freezeEditAdAttributes) ? null : maskThemeOverrides ]);

    // }, [maskTextures, selectedThemeId, account, (editAd && freezeEditAdAttributes) ? null : maskThemeOverrides ]);

};

export default useMask;
