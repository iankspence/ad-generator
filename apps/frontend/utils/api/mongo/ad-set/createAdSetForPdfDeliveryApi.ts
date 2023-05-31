import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';
import { CreateAdSetForPdfDeliveryDto } from '@monorepo/type';

export const createAdSetForPdfDelivery = async (createAdSetForPdfDeliveryDto: CreateAdSetForPdfDeliveryDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/ad-set/create-ad-set-for-pdf-delivery`,
            data: createAdSetForPdfDeliveryDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating ad set:', error);
        throw error;
    }
}
