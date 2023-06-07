import axios from 'axios';
import { API_URL } from '../../apiUrl';
import {
    FindCustomerSubscriptionStatusByAccountIdDto
} from '@monorepo/type';

export const findCustomerSubscriptionStatusByAccountId = async (findCustomerSubscriptionStatusByAccountIdDto: FindCustomerSubscriptionStatusByAccountIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/customer/find-customer-subscription-status-by-account-id`,
            data: findCustomerSubscriptionStatusByAccountIdDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching customer subscription status:', error);
        throw error;
    }
}
