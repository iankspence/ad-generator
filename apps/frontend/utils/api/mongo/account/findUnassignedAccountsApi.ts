import axios from 'axios';
import { API_URL } from '../../apiUrl';

export const findUnassignedAccounts = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/account/find-unassigned-accounts`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching canvas text:', error);
        throw error;
    }
};
