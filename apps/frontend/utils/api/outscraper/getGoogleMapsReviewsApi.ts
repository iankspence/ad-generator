import axios from 'axios';
import { API_URL } from '../../constants/apiUrl';
import { ScrapeGoogleMapsReviewsDto } from '@monorepo/type';

export const getGoogleMapsReviews = async (getGoogleMapsReviewsDto: ScrapeGoogleMapsReviewsDto) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${API_URL}/outscraper/reviews`, getGoogleMapsReviewsDto,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching Google Maps Reviews:', error);
        throw error;
    }
};
