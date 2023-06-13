import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
    const [googleLimit, setGoogleLimit] = useState(2);

    const handleGoogleLimitChange = (event) => {
        setGoogleLimit(event.target.value);
    };

    return (
        <Box className="flex flex-col items-start w-72">
            <Box className="w-full flex justify-between items-center">
                <Box className="flex flex-grow items-center">
                    <Typography className="text-reviewDrumMedGray text-xl py-2 font-semibold flex-grow">Google</Typography>
                    <Select
                        value={googleLimit}
                        onChange={handleGoogleLimitChange}
                        style={{ marginLeft: '5px', marginRight: '5px', fontSize: '12px', flex: '1 0 auto', height: '26px', width: '80px' }}
                    >
                        {[...Array(201).keys()].map((value) => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <ScrapeGoogleMapsButton
                    userId={userId}
                    account={account}
                    setAccount={setAccount}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    reviewsLimit={googleLimit}
                />
            </Box>
            <Box className="w-full flex justify-between items-center mt-4">
                <Box className="flex flex-grow items-center">
                    <Typography className="text-reviewDrumMedGray text-xl py-2 font-semibold flex-grow">RateMDs</Typography>
                </Box>
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
