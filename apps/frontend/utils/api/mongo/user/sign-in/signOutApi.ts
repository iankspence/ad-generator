import axios from 'axios';
import { API_URL } from '../../../../constants/apiUrl';

export const signOut = async () => {
    try {
        const response = await axios.post(`${API_URL}/user/sign-out`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
