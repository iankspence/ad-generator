import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getAccounts = async (userId) => {
    const token = localStorage.getItem('userToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await axios.post(`${API_URL}/account/user`, {userId}, { headers });
        console.log('Response from getAccounts:', response);
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
