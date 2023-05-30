import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getAdsByAccountId = async (accountId) => {
    try {
        const response = await axios.get(`${API_URL}/ad/get-ads-by-account-id/${accountId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ads:', error);
        throw error;
    }
}
