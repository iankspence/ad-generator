import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const saveCanvasesToS3 = async (canvases, userId, account, review, copy, themeId, backgroundImageLocation, maskLocations, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions, editAd) => {
    try {
        const response = await axios.post(`${API_URL}/card/save-canvases`, {
            canvases,
            userId,
            account,
            review,
            copy,
            themeId,
            backgroundImageLocation,
            maskLocations,
            userControlledAttributes,
            xRanges,
            yRanges,
            lineHeightMultipliers,
            filteredTextPositions,
            editAd
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error sending canvas image to backend:', error);
        throw error;
    }
};
