import axios from 'axios';
import { API_URL } from '../../../apiUrl';

export const verifyEmail = async (verifyEmailDto) => {
    try {
        const response = await axios.post(`${API_URL}/user/verify-email`, verifyEmailDto);
        console.log('Response from verifyEmail:', response);
        return response.data;
    } catch (error) {
        console.error('Error verifying email:', error);
        throw error;
    }
};
