import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const createAccount = async (createAccountDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/account`,
            data: createAccountDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;

    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred while creating the account.');
    }
};
