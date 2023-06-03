import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { UpdateReviewTextEditDto } from '@monorepo/type';

export const updateReviewTextEdit = async (updateReviewTextEditDto: UpdateReviewTextEditDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/review/update-text-edit`,
            data: updateReviewTextEditDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}
