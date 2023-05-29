import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScrapeGoogleMapsButton from './ScrapeGoogleMapsButton';
import ScrapeRateMdsButton from './ScrapeRateMdsButton';
import { AccountDocument } from '@monorepo/type';

interface Props {
    userId: string;
    account: AccountDocument | Partial<AccountDocument>;
    setAccount: (account: AccountDocument | Partial<AccountDocument>) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const ReviewConnector: React.FC<Props> = ({ userId, account, setAccount, isLoading, setIsLoading }) => {
    return (
        <Box className="w-72 flex flex-col items-start">
            <Box className="w-full flex justify-between">
                <Typography className="text-reviewDrumMedGray text-xl py-2 font-semibold">Google</Typography>
                <ScrapeGoogleMapsButton
                    userId={userId}
                    account={account}
                    setAccount={setAccount}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </Box>
            <Box className="w-full flex justify-between mt-4">
                <Typography className="text-reviewDrumMedGray text-xl py-2 font-semibold">RateMDs</Typography>
                <ScrapeRateMdsButton
                    userId={userId}
                    account={account}
                    setAccount={setAccount}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </Box>
        </Box>
    );
};

export default ReviewConnector;
