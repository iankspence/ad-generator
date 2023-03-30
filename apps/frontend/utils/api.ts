import axios from 'axios';

const API_URL = 'http://localhost:3333/api';

export const register = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};

export const verifyEmail = async (token) => {
    console.log('verifyEmail (api - frontend):', token);
    try {
        const response = await axios.post(`${API_URL}/verify-email`, {token});
        console.log('Response from verifyEmail:', response)
        return response.data;
    } catch (error) {
        console.error('Error verifying email:', error);
        throw error;
    }
};
