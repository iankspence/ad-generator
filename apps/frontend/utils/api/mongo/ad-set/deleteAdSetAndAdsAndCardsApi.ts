import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { DeleteAdSetAndAdsAndCardsDto } from '@monorepo/type';

export const deleteAdSetAndAdsAndCards = async (deleteAdSetAndAdsAndCardsDto: DeleteAdSetAndAdsAndCardsDto) => {
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
