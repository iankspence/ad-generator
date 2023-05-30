import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getAllTextByAccountId = async (accountId) => {
    try {
        const response = await axios.post(`${API_URL}/account/get-all-text-by-account-id`, { accountId });
        console.log('getAllTextByAccountId response:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching canvas text:', error);
        throw error;
    }
};
