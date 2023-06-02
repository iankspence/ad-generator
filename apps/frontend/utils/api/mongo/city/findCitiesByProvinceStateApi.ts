import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const findCitiesByProvinceStateApi = async (provinceState: string) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/city/find-cities-by-province-state`,
            data: { provinceState },
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
