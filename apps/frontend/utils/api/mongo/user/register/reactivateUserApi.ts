import axios from 'axios';
import { API_URL } from '../../../apiUrl';
import { ReactivateUserDto } from '@monorepo/type';

export const reactivateUser = async (reactivateUserDto: ReactivateUserDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/user/reactivate`,
            data: reactivateUserDto,
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
