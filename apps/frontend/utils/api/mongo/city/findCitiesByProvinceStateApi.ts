import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';
import { FindCitiesByProvinceStateDto } from '@monorepo/type';

export const findCitiesByProvinceStateApi = async (findCitiesByProvinceStateDto: FindCitiesByProvinceStateDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/city/find-cities-by-province-state`,
            data: findCitiesByProvinceStateDto,
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
