import axios from 'axios';
import { API_URL } from '../../../apiUrl';

export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/sign-in`, { email, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
