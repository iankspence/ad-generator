import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getBackgroundImages = async () => {
    try {
        const response = await axios.get(`${API_URL}/background-image/get-background-images`);
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
