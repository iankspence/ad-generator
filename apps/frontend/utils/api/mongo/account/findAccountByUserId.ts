import { FindAccountByUserIdDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const findAccountByUserId = async (findAccountByUserIdDto: FindAccountByUserIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/account/find-account-by-user-id`,
            withCredentials: true,
            data: findAccountByUserIdDto,
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
