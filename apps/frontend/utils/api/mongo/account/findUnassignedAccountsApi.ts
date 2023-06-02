import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const findUnassignedAccounts = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/account/find-unassigned-client-accounts`,
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
