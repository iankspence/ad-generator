import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const updateAccountLogoAndColors = async (
    accountId,
    logo,
    primaryColor,
    secondaryColor
) => {
    try {
        const response = await axios.put(`${API_URL}/account/${accountId}`, {
            logo,
            primaryColor,
            secondaryColor,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating account logo and colors:', error);
        throw error;
    }
};
