import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { CreateApplicationDto } from '@monorepo/type';

export const createApplication = async (createApplicationDto: CreateApplicationDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/application/create`,
            data: createApplicationDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating ad set:', error);
        throw error;
    }
}
