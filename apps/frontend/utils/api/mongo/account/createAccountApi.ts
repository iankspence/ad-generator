import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const createAccount = async (accountData) => {
    try {
        const response = await axios.post(`${API_URL}/account`, accountData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred while creating the account.');
    }
};
