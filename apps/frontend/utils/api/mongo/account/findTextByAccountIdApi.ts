import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { FindTextByAccountIdDto } from '@monorepo/type';

export const findTextByAccountId = async (findTextByAccountIdDto: FindTextByAccountIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/account/find-text-by-account-id`,
            data: findTextByAccountIdDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching canvas text:', error);
        throw error;
    }
};
