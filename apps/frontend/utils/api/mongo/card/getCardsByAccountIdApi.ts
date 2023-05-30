import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getCardsByAccountId = async (accountId) => {
    try {
        const response = await axios.post(`${API_URL}/card/get-cards-by-account-id`, { accountId });
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
}
