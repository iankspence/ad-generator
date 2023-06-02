import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getCountries = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/country/get-countries`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}
