import axios from 'axios';
import { API_URL } from '../../../../constants/apiUrl';

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/get-current-user`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
