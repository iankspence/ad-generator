import axios from 'axios';
import { API_URL } from '../../constants/apiUrl';
import { BrowseAiJobDocument, StartRobotJobDto } from '@monorepo/type';

export const startRobotJob = async (startRobotJobDto: StartRobotJobDto): Promise<BrowseAiJobDocument> => {
    try {
        const response = await axios.post(`${API_URL}/browse-ai/start-robot-job`, startRobotJobDto);
        return response.data;
    } catch (error) {
        console.error('Error starting robot job:', error);
        throw error;
    }
};
