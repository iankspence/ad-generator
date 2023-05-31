import axios from 'axios';
import { API_URL } from '../../../../constants/apiUrl';

export const signIn = async (email, password) => {
    console.log('signInApi: email:', email, 'password:', password)
    try {
        const response = await axios.post(`${API_URL}/user/sign-in`, { email, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
