import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const saveCanvasesToS3 = async (saveCanvasesToS3Dto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/card/save-canvases`,
            data: saveCanvasesToS3Dto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error sending canvas image to backend:', error);
        throw error;
    }
};
