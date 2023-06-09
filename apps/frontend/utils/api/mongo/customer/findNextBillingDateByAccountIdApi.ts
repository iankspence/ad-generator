import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { FindNextBillingDateByAccountIdDto } from '@monorepo/type';

export const findNextBillingDateByAccountId = async (findNextBillingDateByAccountIdDto: FindNextBillingDateByAccountIdDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/customer/find-next-billing-date-by-account-id`,
            data: findNextBillingDateByAccountIdDto,
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
