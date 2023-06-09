import axios from 'axios';
import { API_URL } from '../../../apiUrl';
import { DeactivateUserDto } from '@monorepo/type';

export const deactivateUser = async (deactivateUserDto: DeactivateUserDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/user/deactivate`,
            data: deactivateUserDto,
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
