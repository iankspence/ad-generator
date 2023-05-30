import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const deleteCardsAndAd = async (adId) => {
    try {
        await axios.delete(`${API_URL}/card/delete/${adId}`);
    } catch (error) {
        console.error(error);
    }
}
