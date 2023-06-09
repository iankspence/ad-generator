import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { ReactivateSubscriptionDto } from '@monorepo/type';

export const reactivateSubscription = async (reactivateSubscriptionDto: ReactivateSubscriptionDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/customer/reactivate-subscription`,
            data: reactivateSubscriptionDto,
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
