import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getMasksByNames = async (maskNames) => {
    try {
        const response = await axios.post(`${API_URL}/mask/find-all-by-names`, { maskNames });
        return response.data;
    } catch (error) {
        console.error('Error fetching masks:', error);
        throw error;
    }
};
