import { UpdateCloseTextEditDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const updateCloseTextEdit = async (updateCloseTextEditDto: UpdateCloseTextEditDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/close/update-text-edit`,
            data: updateCloseTextEditDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}
