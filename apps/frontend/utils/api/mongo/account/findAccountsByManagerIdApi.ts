import { FindAccountsByManagerIdDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const findAccountsByManagerId = async (findAccountsByManagerIdDto: FindAccountsByManagerIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/account/find-accounts-by-manager-id`,
            withCredentials: true,
            data: findAccountsByManagerIdDto,
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
