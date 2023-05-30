import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const addGoogleQuery = async (accountId, googleQuery) => {
    console.log('addGoogleQuery DTO (api - frontend):', accountId, googleQuery);

    const response = await axios.patch(`${API_URL}/account/google-query`, { accountId, googleQuery });
    return response.data;
};
