import { saveCanvasesToS3 } from '../../utils/api';
import { formatUserControlledAttributes } from './formatUserControlledAttributes';
import { formatXRanges } from './formatXRanges';
import { formatYRanges } from './formatYRanges';
import { formatLineHeightMultipliers } from './formatLineHeightMultipliers';
import { formatFilteredTextPositions } from './formatFilteredTextPositions';
import { getTextData } from './getTextData';
import { getCanvasData } from './getCanvasData';

export const saveAllApps = async (
    width,
    height,
    isLoading,
    setIsLoading,
    canvasApps,
    account,
    backgroundImageLocation,
    xRanges,
    yRanges,
    lineHeightMultipliers,
    filteredHooks,
    filteredClaims,
    filteredReviews,
    filteredCloses,
    hookPosition,
    claimPosition,
    reviewPosition,
    closePosition,
    user,
    filteredCopies,
    copyPosition,
    selectedThemeId,
    maskLocations,
    editAd,
    updateShowFreezeEditAttributeButton,
    updateEditAd) => {

    if (!isLoading) {
        setIsLoading(true);
        const canvasNames = ['hook', 'claim', 'review', 'close'];
        const filteredDataArray = [filteredHooks, filteredClaims, filteredReviews, filteredCloses];
        const positionArray = [hookPosition, claimPosition, reviewPosition, closePosition];

        const canvases = await Promise.all(canvasNames.map(async (name, index) => {
            if (!canvasApps[name]) return;
            const dataUrl = await getCanvasData(canvasApps[name], width, height);
            const { sourceTextId, sourceText, sourceTextEdited } = getTextData(name, filteredDataArray[index], positionArray[index]);

            return { canvasName: name, dataUrl, sourceTextId, sourceText, sourceTextEdited };
        }));

        const formattedUserControlledAttributes = formatUserControlledAttributes(canvasApps, backgroundImageLocation);

        try {
            await saveCanvasesToS3(
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
                formatFilteredTextPositions(hookPosition, claimPosition, reviewPosition, closePosition, copyPosition),
                editAd
            );

            updateShowFreezeEditAttributeButton(false);
            updateEditAd(null);

            setTimeout(() => {
                setIsLoading(false);
            }, 4000);

        } catch (error) {
            console.error('Error sending images to backend:', error);
        }
    } else {
        console.log('Data is not ready yet');
    }
};
