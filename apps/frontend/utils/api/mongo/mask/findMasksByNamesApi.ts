import { FindMasksByNamesDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const findMasksByNames = async (findMasksByNamesDto: FindMasksByNamesDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/mask/find-all-by-names`,
            data: findMasksByNamesDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching masks:', error);
        throw error;
    }
};
