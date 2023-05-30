import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const updateHookTextEdit = async (hook) => {
    try {
        const response = await axios.post(`${API_URL}/hook/update-text-edit`, {
            hook
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}
