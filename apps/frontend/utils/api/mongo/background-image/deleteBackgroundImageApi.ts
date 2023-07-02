import { DeleteBackgroundImageDto } from '@monorepo/type';
import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const deleteBackgroundImage = async (deleteBackgroundImageDto: DeleteBackgroundImageDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/background-image/delete`,
            data: deleteBackgroundImageDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
