import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const updateAccountLogoAndColors = async (updateAccountLogoAndColorsDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/account/update-account-logo-and-colors`,
            data: updateAccountLogoAndColorsDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating account logo and colors:', error);
        throw error;
    }
};
