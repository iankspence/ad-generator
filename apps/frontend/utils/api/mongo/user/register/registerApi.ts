import axios from 'axios';
import { API_URL } from '../../../../constants/apiUrl';
import { RegisterUserDto } from '@monorepo/type';

export const register = async (registerUserDto: RegisterUserDto) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, registerUserDto);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};
