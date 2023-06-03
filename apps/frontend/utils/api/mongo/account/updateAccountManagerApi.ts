import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { UpdateAccountManagerDto } from '@monorepo/type';

export const updateAccountManager = async (updateAccountManagerDto: UpdateAccountManagerDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/account/update-account-manager`,
            data: updateAccountManagerDto,
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
