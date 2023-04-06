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

export const getClinics = async (userId) => {
    const token = localStorage.getItem('userToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await axios.get(`${API_URL}/clinic/user/${userId}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const deleteClinic = async (clinicId) => {
    const token = localStorage.getItem('userToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await axios.delete(`${API_URL}/clinic/${clinicId}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const addRateMDsLink = async (clinicId: string, rateMDsLink: string) => {
    const response = await axios.post(`${API_URL}/clinic/${clinicId}/rateMDsLink`, { rateMDsLink });
    return response.data;
};

export const updateClinicGoogleLink = async (clinicId, googleLink) => {
    try {
        const response = await axios.patch(`${API_URL}/clinic/google-link`, {
            clinicId,
            googleLink,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Google Link:', error);
        throw error;
    }
};

export const updateClinicFacebookLink = async (clinicId, facebookLink) => {
    try {
        const response = await axios.patch(`${API_URL}/clinic/facebook-link`, {
            clinicId,
            facebookLink,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Google Link:', error);
        throw error;
    }
};

export const updateClinicRateMdsLinks = async (clinicId, rateMdsLink) => {
    try {
        const response = await axios.patch(`${API_URL}/clinic/rate-mds-links`, {
            clinicId,
            rateMdsLink,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Rate MDs Link:', error);
        throw error;
    }
};

export const startRobotJob = async (userId: string, clinicId: string, robotUrl: string, originUrl: string) => {
    try {
        const response = await axios.post(`${API_URL}/browse-ai/start-robot-job`, {
            userId,
            clinicId,
            robotUrl,
            inputParameters: {
                originUrl,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error starting robot job:', error);
        throw error;
    }
};
