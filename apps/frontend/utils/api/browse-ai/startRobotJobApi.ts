import axios from 'axios';
import { API_URL } from '../../constants/apiUrl';

export const startRobotJob = async (userId, accountId, robotUrl, originUrl) => {
    try {
        const response = await axios.post(`${API_URL}/browse-ai/start-robot-job`, {
            userId,
            accountId,
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
