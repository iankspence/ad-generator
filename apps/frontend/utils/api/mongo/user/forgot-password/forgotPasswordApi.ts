import axios from 'axios';
import { API_URL } from '../../../apiUrl';

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/user/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error('Error in forgot password:', error);
        throw error;
    }
};
