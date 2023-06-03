import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const copyCardsAndAd = async (copyCardsAndAdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/card/copy-cards-and-ad`,
            data: copyCardsAndAdDto,
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
