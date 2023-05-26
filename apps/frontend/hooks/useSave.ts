import { useState, useEffect, useCallback, useContext } from 'react';
import { PixiContext } from '../contexts/PixiContext';
import UserContext from "../contexts/UserContext";
import { CampaignContext } from "../contexts/CampaignContext";
import { getFilteredTextArrays } from "../components/pixi/utils/text/getFilteredTextArrays";
import { saveCanvasesToS3 } from '../utils/api';

const useSave = (width = 1080, height = 1080) => {
    const [isLoading, setIsLoading] = useState(true);
    const { canvasApps, selectedThemeId, maskLocations, backgroundImageLocation, xRanges, yRanges, lineHeightMultipliers, editAd, updateShowFreezeEditAttributeButton, updateEditAd } = useContext(PixiContext);
    const { user, account } = useContext(UserContext);
    const { claims, claimPosition, hooks, hookPosition, reviews, reviewPosition, closes, closePosition, copies, copyPosition, selectedAudiencePosition } = useContext(CampaignContext);

    const { filteredReviews, filteredHooks, filteredClaims, filteredCloses, filteredCopies } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

    const extractUserControlledAttributes = useCallback((app, backgroundImageLocation) => {
        const childrenNames = [];
        let imageControls;
        const textControls = [];
        app.stage.children.forEach(child => {
            childrenNames.push(child.name);
            if (child.name.split('-')[0] === 'image') {
                imageControls= {
                    x: child.x,
                    y: child.y,
                    scaleX: child.scale.x,
                    scaleY: child.scale.y,
                    location: backgroundImageLocation
                }
            } else if (child.name.split('-')[0] === 'text') {
                const textControl = {
                    name: child.name,
                    x: child.x,
                    y: child.y,
                    text: child.text,
                    style: child.style
                }
                textControls.push(textControl);
            }

        });
        return {childrenNames, imageControls, textControls};
    }, []);

    const formatUserControlledAttributes = useCallback((canvasApps, backgroundImageLocation) => {
        const formattedApps = [];
        for(const key in canvasApps) {
            if(canvasApps[key] !== null) {
                const { childrenNames, imageControls, textControls } = extractUserControlledAttributes(canvasApps[key], backgroundImageLocation);
                formattedApps.push({
                    canvasName: key,
                    // canvasAppStage: canvasApps[key].stage,
                    childrenNames: childrenNames,
                    imageControls: imageControls,
                    textControls: textControls
                });
            }
        }
        return formattedApps;
    }, [extractUserControlledAttributes]);

    const formatXRanges = useCallback((xRanges) => {
        const formattedRanges = [];
        for(const key in xRanges) {
            formattedRanges.push({
                canvasName: key,
                xRange: xRanges[key]
            });
        }
        return formattedRanges;
    }, []);

    const formatYRanges = useCallback((yRanges) => {
        const formattedRanges = [];
        for(const key in yRanges) {
            formattedRanges.push({
                canvasName: key,
                yRange: yRanges[key]
            });
        }
        return formattedRanges;
    }, []);

    const formatLineHeightMultipliers = useCallback((lineHeightMultipliers) => {
        const formattedMultipliers = [];
        for(const key in lineHeightMultipliers) {
            formattedMultipliers.push({
                canvasName: key,
                lineHeightMultiplier: lineHeightMultipliers[key]
            });
        }
        return formattedMultipliers;
    }, [lineHeightMultipliers]);


    const formatFilteredTextPositions = useCallback(() => {
        const formattedFilteredTextPositions = [];
        formattedFilteredTextPositions.push({
            canvasName: 'hook',
            position: hookPosition
        });
        formattedFilteredTextPositions.push({
            canvasName: 'claim',
            position: claimPosition
        });
        formattedFilteredTextPositions.push({
            canvasName: 'review',
            position: reviewPosition
        });
        formattedFilteredTextPositions.push({
            canvasName: 'close',
            position: closePosition
        });
        return formattedFilteredTextPositions;
    }, [hookPosition, claimPosition, reviewPosition, closePosition]);

    useEffect(() => {
        if (filteredHooks.length > 0 && filteredClaims.length > 0 && filteredReviews.length > 0 && filteredCloses.length > 0) {
            setIsLoading(false);
        }
    }, [filteredHooks, filteredClaims, filteredReviews, filteredCloses, filteredCopies, backgroundImageLocation, xRanges, yRanges, lineHeightMultipliers]);

    const getSourceData = useCallback((canvasName, filteredData, position) => {
        const item = filteredData[position - 1] || {};
        return {
            sourceText: item[`${canvasName}Text`] || '',
            sourceTextEdited: item[`${canvasName}TextEdited`] || '',
            sourceTextId: item._id || '',
        }
    }, [hookPosition, claimPosition, reviewPosition]);

    const getCanvasData = useCallback(async (app) => {
        if (app) {
            const originalWidth = app.screen.width;
            const originalHeight = app.screen.height;
            const originalScaleX = app.stage.scale.x;
            const originalScaleY = app.stage.scale.y;

            const targetScaleX = width / originalWidth;
            const targetScaleY = height / originalHeight;

            app.renderer.resize(width, height);
            app.stage.scale.set(originalScaleX * targetScaleX, originalScaleY * targetScaleY);

            app.renderer.render(app.stage);
            const dataUrl = app.view.toDataURL('image/png');

            app.renderer.resize(originalWidth, originalHeight);
            app.stage.scale.set(originalScaleX, originalScaleY);

            return dataUrl;
        }
    }, [width, height]);

    const saveAllApps = useCallback(async () => {
        if (!isLoading) {
            const canvasNames = ['hook', 'claim', 'review', 'close'];
            const filteredDataArray = [filteredHooks, filteredClaims, filteredReviews, filteredCloses];
            const positionArray = [hookPosition, claimPosition, reviewPosition, closePosition];

            const canvases = await Promise.all(canvasNames.map(async (name, index) => {
                if (!canvasApps[name]) return;
                const dataUrl = await getCanvasData(canvasApps[name]);
                const { sourceText, sourceTextEdited, sourceTextId } = getSourceData(name, filteredDataArray[index], positionArray[index]);

                return { canvasName: name, dataUrl, sourceTextId, sourceText, sourceTextEdited };
            }));

            const formattedUserControlledAttributes = formatUserControlledAttributes(canvasApps, backgroundImageLocation);

            try {
                const savedCanvases = await saveCanvasesToS3(
                    canvases,
                    user?._id,
                    account,
                    filteredReviews[reviewPosition - 1],
                    filteredCopies[copyPosition - 1],
                    selectedThemeId,
                    backgroundImageLocation,
                    maskLocations,
                    formattedUserControlledAttributes,
                    formatXRanges(xRanges),
                    formatYRanges(yRanges),
                    formatLineHeightMultipliers(lineHeightMultipliers),
                    formatFilteredTextPositions(),
                    editAd
                );

                updateShowFreezeEditAttributeButton(false);
                updateEditAd(null);

                console.log('Saved canvases:', savedCanvases)

                // reset ranges and lineHeightMultipliers?

            } catch (error) {
                console.error('Error sending images to backend:', error);
            }
        } else {
            console.log('Data is not ready yet');
        }
    }, [canvasApps, getCanvasData, account, isLoading, getSourceData, backgroundImageLocation, xRanges, yRanges, lineHeightMultipliers]);

    return { saveAllApps };
};

export default useSave;
