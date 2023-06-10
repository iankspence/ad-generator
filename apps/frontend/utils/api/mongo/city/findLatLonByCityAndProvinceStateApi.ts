import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { FindLatLonByCityAndProvinceStateDto } from '@monorepo/type';

export const findLatLonByCityAndProvinceState = async (findLatLonByCityAndProvinceStateDto: FindLatLonByCityAndProvinceStateDto): Promise<{
    lat: number,
    lon: number
}> => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/city/find-lat-lon-by-city-and-province-state`,
            data: findLatLonByCityAndProvinceStateDto,
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
