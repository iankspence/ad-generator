import axios from 'axios';
import { API_URL } from '../apiUrl';
import { BrowseAiJobDocument, StartRobotJobDto } from '@monorepo/type';

export const startRobotJob = async (startRobotJobDto: StartRobotJobDto): Promise<BrowseAiJobDocument> => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/browse-ai/start-robot-job`,
            data: startRobotJobDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error starting robot job:', error);
        throw error;
    }
};
