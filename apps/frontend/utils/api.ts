import axios from 'axios';

const API_URL = 'http://localhost:3333/api'; // Update this with your backend API URL

export const register = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};
