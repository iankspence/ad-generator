import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const getTextByAccountId = async (getTextByAccountIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/account/get-text-by-account-id`,
            data: getTextByAccountIdDto,
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
