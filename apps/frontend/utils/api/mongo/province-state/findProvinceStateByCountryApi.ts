import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';
import { FindProvinceStatesByCountryDto } from '@monorepo/type';

export const findProvinceStateByCountryApi = async (findProvinceStateByCountryDto: FindProvinceStatesByCountryDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/province-state/find-province-states-by-country`,
            data: findProvinceStateByCountryDto,
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
