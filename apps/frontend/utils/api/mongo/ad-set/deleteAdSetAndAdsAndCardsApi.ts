import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const deleteAdSetAndAdsAndCards = async (adSetId: string) => {
    try{
        const response = await axios.post(`${API_URL}/ad-set/delete-ad-set-and-ads-and-cards`, { adSetId });
        return response.data;
    } catch (error) {
        console.error('Error fetching ad sets:', error);
        throw error;
    }
}
