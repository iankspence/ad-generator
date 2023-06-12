import React, { useContext, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import ChangeAudienceButton from '../ChangeAudienceButton';
import UserContext from '../../../contexts/UserContext';
import { CampaignContext } from '../../../contexts/CampaignContext';
import ReviewConnector from '../buttons/ReviewConnector';

const PrivateAccessButton = ({ refreshReviews, setRefreshReviews }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { user, account, setAccount } = useContext(UserContext);
    const { reviews, selectedAudiencePosition } = useContext(CampaignContext);

    const filteredReviews = reviews.filter(review => Number(review.bestFitAudience) === Number(selectedAudiencePosition));

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Box>
            <div className="fixed top-12 left-8 z-10 bg-reviewDrumMedGray hover:gray-100 rounded-full">
                <IconButton
                    onClick={handleDrawerOpen}
                    className="text-reviewDrumDarkGray"
                >
                    <KeyIcon />
                </IconButton>
            </div>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        width: '322px',
                        padding: 2,
                    },
                }}
                componentsProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'transparent',
                        },
                    },
                }}

            >
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Admin Access
                    </Typography>
                    <ReviewConnector
                        userId={user?._id?.toString()}
                        account={account}
                        setAccount={setAccount}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                    <ChangeAudienceButton
                        filteredReviews={filteredReviews}
                        refreshReviews={refreshReviews}
                        setRefreshReviews={setRefreshReviews}
                    />
                </Box>
            </Drawer>
        </Box>
    );
};

export default PrivateAccessButton;
