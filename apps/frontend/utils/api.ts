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
        const response = await axios.post(`${API_URL}/verify-email`, { token });
        console.log('Response from verifyEmail:', response);
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

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error('Error in forgot password:', error);
        throw error;
    }
};

export const resetPassword = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, data);
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};

export const userAccount = async (jwtToken) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
    };
    try {
        const response = await axios.post(`${API_URL}/user-account`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const createClinic = async (clinicData) => {
    try {
        const response = await axios.post(`${API_URL}/clinic`, clinicData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred while creating the clinic.');
    }
};

export const addClinicToUser = async (userId, clinicId) => {
    try {
        const response = await axios.put(`${API_URL}/clinic/${userId}/clinic/${clinicId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred while adding the clinic to the user.');
    }
};

export const getClinics = async (jwtToken, userId) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
    };
    try {
        const response = await axios.get(`${API_URL}/clinic/${userId}/clinics`, { headers });
        console.log('Response from getClinicIds:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
