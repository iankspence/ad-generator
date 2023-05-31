import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';
import { UpdateReviewAudienceDto } from '@monorepo/type';

export const updateReviewAudience = async (updateReviewAudienceDto: UpdateReviewAudienceDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/review/update-audience`,
            data: updateReviewAudienceDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};
