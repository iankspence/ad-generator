import axios from 'axios';
import { API_URL } from '../../../../constants/apiUrl';

export const verifyEmail = async (token) => {
    console.log('verifyEmail (api - frontend):', token);
    try {
        const response = await axios.post(`${API_URL}/user/verify-email`, { token });
        console.log('Response from verifyEmail:', response);
        return response.data;
    } catch (error) {
        console.error('Error verifying email:', error);
        throw error;
    }
};
