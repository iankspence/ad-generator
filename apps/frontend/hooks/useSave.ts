import { useState, useEffect, useCallback, useContext } from 'react';
import { PixiContext } from '../contexts/PixiContext';
import UserContext from "../contexts/UserContext";
import { CampaignContext } from "../contexts/CampaignContext";
import { getFilteredTextArrays } from "../components/pixi/utils/text/getFilteredTextArrays";
import { saveCanvasesToS3 } from '../utils/api';

const useSave = (width = 1080, height = 1080) => {
    const [isLoading, setIsLoading] = useState(true);
    const { canvasApps, selectedThemeId, maskLocations, backgroundImageLocation } = useContext(PixiContext);
    const { user, account } = useContext(UserContext);
    const { claims, claimPosition, hooks, hookPosition, reviews, reviewPosition, closes, closePosition, copies, copyPosition, selectedAudiencePosition } = useContext(CampaignContext);

    const { filteredReviews, filteredHooks, filteredClaims, filteredCloses, filteredCopies } = getFilteredTextArrays(reviews, reviewPosition, hooks, hookPosition, claims, closes, copies, selectedAudiencePosition);

    useEffect(() => {
        if (filteredHooks.length > 0 && filteredClaims.length > 0 && filteredReviews.length > 0 && filteredCloses.length > 0) {
            setIsLoading(false);
        }
    }, [filteredHooks, filteredClaims, filteredReviews, filteredCloses, filteredCopies]);

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
                const dataUrl = await getCanvasData(canvasApps[name]);
                const { sourceText, sourceTextEdited, sourceTextId } = getSourceData(name, filteredDataArray[index], positionArray[index]);

                return { canvasName: name, dataUrl, sourceTextId, sourceText, sourceTextEdited };
            }));

            try {
                await saveCanvasesToS3(
                    canvases,
                    user?._id,
                    account,
                    filteredReviews[reviewPosition - 1],
                    filteredCopies[copyPosition - 1],
                    selectedThemeId,
                    backgroundImageLocation,
                    maskLocations
                );
            } catch (error) {
                console.error('Error sending images to backend:', error);
            }
        } else {
            console.log('Data is not ready yet');
        }
    }, [canvasApps, getCanvasData, account, isLoading, getSourceData, backgroundImageLocation]);

    return { saveAllApps };
};

export default useSave;
