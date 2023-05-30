import axios from 'axios';
import { API_URL } from '../../../../constants/apiUrl';

export const register = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, data);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};
