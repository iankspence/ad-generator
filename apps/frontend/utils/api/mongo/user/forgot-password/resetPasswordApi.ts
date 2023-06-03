import axios from 'axios';
import { API_URL } from '../../../apiUrl';

export const resetPassword = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/user/reset-password`, data);
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};
