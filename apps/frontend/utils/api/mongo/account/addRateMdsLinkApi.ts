import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const addRateMdsLink = async (addRateMdsLinkDto) => {
    try {
        const response = await axios({
            method: 'patch',
            url: `${API_URL}/account/add-rate-mds-link`,
            data: addRateMdsLinkDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding rate mds link:', error);
        throw error;
    }
};
