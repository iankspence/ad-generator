import axios from 'axios';
import { API_URL } from '../../apiUrl';
import { UpdateAdsPaidWithoutDeliveryDto } from '@monorepo/type';

export const updateAdsPaidWithoutDelivery = async (updateAdsPaidWithoutDeliveryDto: UpdateAdsPaidWithoutDeliveryDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/account/update-ads-paid-without-delivery`,
            data: updateAdsPaidWithoutDeliveryDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating Ads Paid Without Delivery:', error);
        throw error;
    }
};
