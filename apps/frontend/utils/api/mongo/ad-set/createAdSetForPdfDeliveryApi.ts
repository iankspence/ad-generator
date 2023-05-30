import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const createAdSetForPdfDelivery = async (userId, accountId, adIds, bestFitAudience, bestFitAudienceName, ageRange, interests) => {
    try {
        const response = await axios.post(`${API_URL}/ad-set/create-ad-set-for-pdf-delivery`, { userId, accountId, adIds, bestFitAudience, bestFitAudienceName, ageRange, interests });
        return response.data;
    } catch (error) {
        console.error('Error creating ad set:', error);
        throw error;
    }
}
