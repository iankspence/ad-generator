import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const copyCardsAndAd = async (adId) => {
    try {
        const response = await axios.post(`${API_URL}/card/copy-cards-and-ad`, { adId });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
