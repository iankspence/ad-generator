import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const findCardsByAccountId = async (findCardsByAccountIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/card/find-cards-by-account-id`,
            data: findCardsByAccountIdDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
}
