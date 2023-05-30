import axios from 'axios';
import { API_URL } from '../../constants/apiUrl';

export const getGoogleMapsReviews = async (userId, accountId, query) => {
    try {
        const response = await axios.post(`${API_URL}/outscraper/reviews`, { userId, accountId, query });
        return response.data;
    } catch (error) {
        console.error('Error fetching Google Maps Reviews:', error);
        throw error;
    }
};
