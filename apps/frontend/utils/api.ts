import account from '../pages/account';
import {
    AccountDocument,
    ClaimDocument,
    CloseDocument,
    CopyDocument,
    Hook,
    HookDocument,
    MaskDocument,
    Review,
    ReviewDocument,
} from '@monorepo/type';
import axios from 'axios';

const API_URL = 'http://localhost:3333/api';

export const register = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};

export const verifyEmail = async (token) => {
    console.log('verifyEmail (api - frontend):', token);
    try {
        const response = await axios.post(`${API_URL}/verify-email`, { token });
        console.log('Response from verifyEmail:', response);
        return response.data;
    } catch (error) {
        console.error('Error verifying email:', error);
        throw error;
    }
};

export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/sign-in`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error('Error in forgot password:', error);
        throw error;
    }
};

export const resetPassword = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, data);
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};

export const userAccount = async (jwtToken) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
    };
    try {
        const response = await axios.post(`${API_URL}/user-account`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const createAccount = async (accountData) => {
    try {
        const response = await axios.post(`${API_URL}/account`, accountData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred while creating the account.');
    }
};

export const getAccounts = async (userId): Promise<AccountDocument[]> => {
    const token = localStorage.getItem('userToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await axios.post(`${API_URL}/account/user`, {userId}, { headers });
        console.log('Response from getAccounts:', response);
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const addRateMdsLink = async (dto: { accountId: string; rateMdsLink: string }) => {
    console.log('addRateMdsLink DTO (api - frontend):', dto);
    const response = await axios.patch(`${API_URL}/account/rate-mds-link`, dto);
    return response.data;
};

export const addGoogleQuery = async (accountId: string, googleQuery: string) => {
    console.log('addGoogleQuery DTO (api - frontend):', accountId, googleQuery);

    const response = await axios.patch(`${API_URL}/account/google-query`, { accountId, googleQuery });
    return response.data;
};

export const startRobotJob = async (userId: string, accountId: string, robotUrl: string, originUrl: string) => {
    console.log('startRobotJob (api - frontend):', userId, robotUrl, originUrl);
    try {
        const response = await axios.post(`${API_URL}/browse-ai/start-robot-job`, {
            userId,
            accountId,
            robotUrl,
            inputParameters: {
                originUrl,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error starting robot job:', error);
        throw error;
    }
};

export const getGoogleMapsReviews = async (userId: string, accountId: string, query: string) => {
    try {
        const response = await axios.post(`${API_URL}/outscraper/reviews`, { userId, accountId, query });
        return response.data;
    } catch (error) {
        console.error('Error fetching Google Maps Reviews:', error);
        throw error;
    }
};

export const getAccountByUserId = async (userId: string) => {
    try {
        console.log('getAccountByUserId userId:', userId);
        const response = await axios.get(`${API_URL}/account/user/${userId}`);
        console.log('getAccountByUserId response:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching account:', error);
        throw error;
    }
};

export const getReviewsByAccountId = async (accountId: string) => {
    try {
        const response = await axios.get(`${API_URL}/review/account/${accountId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const updateReview = async (
    userId: string,
    reviewId: string,
    bestFitAudience: number,
    bestFitReasoning: string,
) => {
    try {
        const response = await axios.patch(`${API_URL}/review/update`, {
            userId,
            reviewId,
            bestFitAudience,
            bestFitReasoning,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};

export const getMasksByNames = async (maskNames: string[]): Promise<MaskDocument[]> => {
    try {
        const response = await axios.post(`${API_URL}/mask/find-all-by-names`, { maskNames });
        return response.data;
    } catch (error) {
        console.error('Error fetching masks:', error);
        throw error;
    }
};

export const getAllTextByAccountId = async (
    accountId: string,
): Promise<[ReviewDocument[], HookDocument[], ClaimDocument[], CloseDocument[], CopyDocument[]]> => {
    try {
        const response = await axios.post(`${API_URL}/account/get-all-text-by-account-id`, { accountId });
        console.log('getAllTextByAccountId response:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching canvas text:', error);
        throw error;
    }
};


export const updateReviewTextEdit = async (
    review
) => {
    try {
        const response = await axios.post(`${API_URL}/review/update-text-edit`, {
            review
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}

export const updateHookTextEdit = async (
    hook
) => {
    try {
        const response = await axios.post(`${API_URL}/hook/update-text-edit`, {
            hook
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}

export const updateClaimTextEdit = async (
    claim
) => {
    try {
        const response = await axios.post(`${API_URL}/claim/update-text-edit`, {
            claim
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}

export const updateCloseTextEdit = async (
    close
) => {
    try {
        const response = await axios.post(`${API_URL}/close/update-text-edit`, {
            close
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}

export const updateCopyTextEdit = async (
    copy
) => {
    try {
        const response = await axios.post(`${API_URL}/copy/update-text-edit`, {
            copy
        });
        return response.data;
    } catch (error) {
        console.error('Error updating review text edit:', error);
        throw error;
    }
}
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

export const saveCanvasesToS3 = async (canvases, userId, account, review, copy, themeId, backgroundImageLocation, maskLocations, userControlledAttributes, xRanges, yRanges, lineHeightMultipliers, filteredTextPositions, editAd) => {
    try {
        const response = await axios.post(`${API_URL}/card/save-canvases`, {
            canvases,
            userId,
            account,
            review,
            copy,
            themeId,
            backgroundImageLocation,
            maskLocations,
            userControlledAttributes,
            xRanges,
            yRanges,
            lineHeightMultipliers,
            filteredTextPositions,
            editAd
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error sending canvas image to backend:', error);
        throw error;
    }
};

export const getBackgroundImages = async () => {
    try {
        const response = await axios.get(`${API_URL}/background-image/get-background-images`);
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}

export const getAdsByAccountId = async (accountId) => {
    try {
        const response = await axios.get(`${API_URL}/ad/get-ads-by-account-id/${accountId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ads:', error);
        throw error;
    }
}

export const copyAd = async (adId) => {
    try {
        const response = await axios.post(`${API_URL}/ad/copy`, { adId });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteAd = async (adId) => {
    try {
        await axios.delete(`${API_URL}/ad/delete/${adId}`);
    } catch (error) {
        console.error(error);
    }
}

export const getCardsByAccountId = async (accountId) => {
    try {
        const response = await axios.post(`${API_URL}/card/get-cards-by-account-id`, { accountId });
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
}

export const createAdSetForPdfDelivery = async (userId, accountId, adIds, bestFitAudience, bestFitAudienceName, ageRange, interests) => {
    try {
        const response = await axios.post(`${API_URL}/ad-set/create-ad-set-for-pdf-delivery`, { userId, accountId, adIds, bestFitAudience, bestFitAudienceName, ageRange, interests });
        return response.data;
    } catch (error) {
        console.error('Error creating ad set:', error);
        throw error;
    }
}


export const getAdSetById = async (adSetId: string) => {
    try {
        const response = await axios.post(`${API_URL}/ad-set/get-ad-set-by-id`, { adSetId });
        return response.data;
    } catch (error) {
        console.error('Error fetching ad sets:', error);
        throw error;
    }
}
