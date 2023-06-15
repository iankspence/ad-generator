import { FindHookTextByAdIdDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const findHookTextByAdId = async (findHookTextByAdIdDto: FindHookTextByAdIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/ad/find-hook-text-by-ad-id`,
            data: findHookTextByAdIdDto,
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
