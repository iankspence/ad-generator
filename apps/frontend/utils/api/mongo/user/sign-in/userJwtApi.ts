import axios from 'axios';
import { API_URL } from '../../../../constants/apiUrl';

export const userJwt = async (jwtToken) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
    };
    try {
        const response = await axios.post(`${API_URL}/user/jwt`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
