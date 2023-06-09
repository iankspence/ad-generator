import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { ChangeSubscriptionDto } from '@monorepo/type';

export const changeSubscription = async (changeSubscriptionDto: ChangeSubscriptionDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/customer/change-subscription`,
            data: changeSubscriptionDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error changing subscription:', error);
        throw error;
    }
};
