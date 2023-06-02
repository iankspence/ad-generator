import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const findProvinceStateByCountryApi = async (country: string) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/province-state/find-province-states-by-country`,
            data: { country },
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
