import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const updateCloseTextEdit = async (
    close
) => {
    try {
        const response = await axios.post(`${API_URL}/close/update-text-edit`, {
            close
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}
