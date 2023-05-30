import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getReviewsByAccountId = async (accountId) => {
    try {
        const response = await axios.get(`${API_URL}/review/account/${accountId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};
