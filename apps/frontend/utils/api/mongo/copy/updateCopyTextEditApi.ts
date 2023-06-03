import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { UpdateCopyTextEditDto } from '@monorepo/type';

export const updateCopyTextEdit = async (updateCopyTextEditDto: UpdateCopyTextEditDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/copy/update-text-edit`,
            data: updateCopyTextEditDto,
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
