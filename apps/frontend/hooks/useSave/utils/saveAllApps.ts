import { saveCanvasesToS3 } from '../../../utils/api/mongo/card/saveCanvasesToS3Api';
import { formatUserControlledAttributes } from './format/formatUserControlledAttributes';
import { formatXRanges } from './format/formatXRanges';
import { formatYRanges } from './format/formatYRanges';
import { formatLineHeightMultipliers } from './format/formatLineHeightMultipliers';
import { formatFilteredTextPositions } from './format/formatFilteredTextPositions';
import { getTextData } from './getTextData';
import { getCanvasData } from './getCanvasData';
import { SaveCanvasesToS3Dto } from '@monorepo/type';

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
    updateEditAd,
    maskThemeOverrides) => {

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

        const formattedUserControlledAttributes = formatUserControlledAttributes(canvasApps, backgroundImageLocation, maskThemeOverrides);

        try {
            const saveCanvasesToS3Dto: SaveCanvasesToS3Dto = {
                canvases,
                userId: user?._id,
                account,
                review: filteredReviews[reviewPosition - 1],
                copy: filteredCopies[copyPosition - 1],
                themeId: selectedThemeId,
                backgroundImageLocation,
                maskLocations,
                userControlledAttributes: formattedUserControlledAttributes,
                xRanges: formatXRanges(xRanges),
                yRanges: formatYRanges(yRanges),
                lineHeightMultipliers: formatLineHeightMultipliers(lineHeightMultipliers),
                filteredTextPositions: formatFilteredTextPositions(hookPosition, claimPosition, reviewPosition, closePosition, copyPosition),
                editAd
            };
            await saveCanvasesToS3(saveCanvasesToS3Dto);

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
