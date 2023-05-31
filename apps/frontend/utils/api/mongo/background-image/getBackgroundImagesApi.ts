import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getBackgroundImages = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/background-image/get-background-images`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
