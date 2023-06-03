import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const deleteCardsAndAd = async (deleteCardsAndAdDto) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${API_URL}/card/delete-cards-and-ad`,
            data: deleteCardsAndAdDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}
