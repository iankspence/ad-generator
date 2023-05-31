import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getAccounts = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/account/get-accounts`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
