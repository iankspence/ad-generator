import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { CreateUserActionDto } from '@monorepo/type';

export const createUserAction = async (createUserActionDto: CreateUserActionDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/user-action/create`,
            data: createUserActionDto,
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
