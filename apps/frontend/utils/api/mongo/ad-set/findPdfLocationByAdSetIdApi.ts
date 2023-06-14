import { FindPdfLocationByAdSetIdDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const findPdfLocationByAdSetId = async (findPdfLocationByAdSetIdDto: FindPdfLocationByAdSetIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/ad-set/find-pdf-location-by-ad-set-id`,
            data: findPdfLocationByAdSetIdDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error downloading PDF:', error);
        throw error;
    }
}
