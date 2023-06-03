import { DeleteAccountDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const deleteAccount = async (deleteAccountDto: DeleteAccountDto) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${API_URL}/account/delete`,
            data: deleteAccountDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;

    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred while deleting the account.');
    }
};
