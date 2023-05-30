import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const updateClaimTextEdit = async (claim) => {
    try {
        const response = await axios.post(`${API_URL}/claim/update-text-edit`, {
            claim
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}
