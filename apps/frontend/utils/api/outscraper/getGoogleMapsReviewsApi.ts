import axios from 'axios';
import { API_URL } from '../../constants/apiUrl';
import { ScrapeGoogleMapsReviewsDto } from '@monorepo/type';

export const getGoogleMapsReviews = async (getGoogleMapsReviewsDto: ScrapeGoogleMapsReviewsDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/outscraper/reviews`,
            data: getGoogleMapsReviewsDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Google Maps Reviews:', error);
        throw error;
    }
};
