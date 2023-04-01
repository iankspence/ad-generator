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

export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/sign-in`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};


export const userAccount = async (jwtToken) => {
    console.log('getAccount (api - frontend):', jwtToken);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
    }

    try {
        const response = await axios.post(`${API_URL}/user-account`, {}, { headers });
        console.log('Response from getAccount:', response.data)
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }

};
