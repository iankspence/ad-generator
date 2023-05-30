import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const updateReview = async (
    userId,
    reviewId,
    bestFitAudience,
    bestFitReasoning,
) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.patch(`${API_URL}/review/update`, {
            userId,
            reviewId,
            bestFitAudience,
            bestFitReasoning,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};
