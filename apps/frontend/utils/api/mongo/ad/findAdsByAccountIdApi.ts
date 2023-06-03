import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const findAdsByAccountId = async (findAdsByAccountIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/ad/find-ads-by-account-id`,
            data: findAdsByAccountIdDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching ads:', error);
        throw error;
    }
}
