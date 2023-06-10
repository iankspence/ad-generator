import React, { useContext } from 'react';
import UserContext from "../contexts/UserContext";
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import NoAccess from '../components/loading-screen/NoAccess';

export default function SubscriptionUpdated() {
    const { user, subscriptionTier } = useContext(UserContext);
    const router = useRouter();
    useUser();

    const handleGoToAccount = () => {
        router.push('/account');
    }

    if (!user || !user?.roles) {
        return <LoadingScreen />;
    }

    if (!user?.roles.includes('admin') && !user?.roles.includes('content-manager') && !user?.roles.includes('client')) {
        return <NoAccess />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-reviewdrumLightGray">
            <div className="w-full md:w-3/5 lg:w-2/5 bg-white shadow-md p-8 rounded-lg">
                <h1 className="text-3xl font-semibold text-center mb-4">Thank You For Your Subscription!</h1>
                <p className="mb-4">{`We're thrilled to have you onboard and are excited to work with you.`}</p>

                {(subscriptionTier === 'practitioner') && (
                    <p className="mb-4">{`Within 3 business days, your ads will be uploaded to your 'deliveries' tab where they will be available for the duration of your subscription.  You'll receive an email as soon as they're ready.`}</p>
                )}

                {(subscriptionTier === 'team') && (
                    <p className="mb-4">{`Within 3 business days, your ads will be uploaded to your 'deliveries' tab where they will be available for the duration of your subscription.  You'll receive an email as soon as they're ready.`}</p>
                )}

                {(subscriptionTier === 'clinic') && (
                    <p className="mb-4">{`Within 3 business days, we'll create and request approval for our initial ad set.`}</p>
                )}

                <Button type="button" variant="contained" color="inherit" className="w-full mt-6" onClick={handleGoToAccount}>Go To Account</Button>
            </div>
        </div>
    );
}

