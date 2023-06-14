import { UpdateAdStatusByAdSetIdDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const updateAdStatusByAdSetId = async (updateAdStatusByAdSetIdDto: UpdateAdStatusByAdSetIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/ad-set/update-ad-status-by-ad-set-id`,
            data: updateAdStatusByAdSetIdDto,
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
