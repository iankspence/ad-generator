import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { DeactivateSubscriptionDto } from '@monorepo/type';

export const deactivateSubscription = async (deactivateSubscriptionDto: DeactivateSubscriptionDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/customer/deactivate-subscription`,
            data: deactivateSubscriptionDto,
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
