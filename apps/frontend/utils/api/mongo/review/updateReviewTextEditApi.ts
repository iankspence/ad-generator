import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const updateReviewTextEdit = async (review) => {
    try {
        const response = await axios.post(`${API_URL}/review/update-text-edit`, {
            review
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}
