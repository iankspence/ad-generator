import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { UpdateHookTextEditDto } from '@monorepo/type';

export const updateHookTextEdit = async (updateHookTextEditDto: UpdateHookTextEditDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/hook/update-text-edit`,
            data: updateHookTextEditDto,
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
