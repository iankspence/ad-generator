import { UpdateClaimTextEditDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const updateClaimTextEdit = async (updateClaimTextEditDto: UpdateClaimTextEditDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/claim/update-text-edit`,
            data: updateClaimTextEditDto,
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
