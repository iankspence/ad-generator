import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const addGoogleQuery = async (addGoogleQueryDto) => {
    try {
        const response = await axios({
            method: 'patch',
            url: `${API_URL}/account/add-google-query`,
            data: addGoogleQueryDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding google query:', error);
        throw error;
    }
};
