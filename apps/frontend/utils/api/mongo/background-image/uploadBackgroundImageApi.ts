import axios from 'axios';
import { API_URL } from '../../apiUrl';

interface UploadBackgroundImageParams {
    accountId: string;
    backgroundImage: any;
}

export const uploadBackgroundImage = async (params: UploadBackgroundImageParams) => {
    try {
        const { accountId, backgroundImage } = params;

        const data = new FormData();
        data.append('accountId', accountId);
        data.append('backgroundImage', backgroundImage, backgroundImage.name);

        const response = await axios({
            method: 'post',
            url: `${API_URL}/background-image/upload`,
            data,
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}
