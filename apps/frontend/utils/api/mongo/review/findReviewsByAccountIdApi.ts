import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { FindReviewsByAccountIdDto } from '@monorepo/type';

export const findReviewsByAccountId = async (findReviewsByAccountIdDto: FindReviewsByAccountIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/review/find-by-account-id`,
            data: findReviewsByAccountIdDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};
