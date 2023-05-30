import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const updateCopyTextEdit = async (
    copy
) => {
    try {
        const response = await axios.post(`${API_URL}/copy/update-text-edit`, {
            copy
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}
