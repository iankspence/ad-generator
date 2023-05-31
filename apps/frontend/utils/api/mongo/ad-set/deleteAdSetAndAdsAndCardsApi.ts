import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const deleteAdSetAndAdsAndCards = async (deleteAdSetAndAdsAndCardsDto) => {
    try{
        const response = await axios({
            method: 'post',
            url: `${API_URL}/ad-set/delete-ad-set-and-ads-and-cards`,
            data: deleteAdSetAndAdsAndCardsDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching ad sets:', error);
        throw error;
    }
}
