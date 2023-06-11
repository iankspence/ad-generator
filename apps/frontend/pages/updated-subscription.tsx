import React, { useContext } from 'react';
import UserContext from "../contexts/UserContext";
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import BottomNav from '../components/nav-bars/BottomNav';

export default function SubscriptionUpdated() {
    const { user } = useContext(UserContext);
    const router = useRouter();
    useUser();

    const handleGoToAccount = () => {
        router.push('/account');
    }

    if (!user || !user?.roles) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-reviewdrumLightGray">
            <div className="w-full md:w-3/5 lg:w-2/5 bg-white shadow-md p-8 rounded-lg">
                <h1 className="text-3xl font-semibold text-center mb-4">Thank You For Your Subscription!</h1>
                <p className="mb-4">{`We're thrilled to have you onboard and are excited to work with you.`}</p>

                <Button type="button" variant="contained" color="inherit" className="w-full mt-6" onClick={handleGoToAccount}>Go To Account</Button>
            </div>
            <BottomNav />
        </div>
    );
}

