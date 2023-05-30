import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';

export const addRateMdsLink = async (dto) => {
    const response = await axios.patch(`${API_URL}/account/rate-mds-link`, dto);
    return response.data;
};
