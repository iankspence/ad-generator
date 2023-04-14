import { ScrapeGoogleMapsButton } from '../ScrapeGoogleMapsButton';
import ScrapeRateMdsButton from '../ScrapeRateMdsButton';
import { AccountDocument } from '@monorepo/type';
import React from 'react';

interface Props {
    userId: string;
    account: AccountDocument;
    setAccount: (account: AccountDocument) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const SidebarReviewConnector: React.FC<Props> = ({ userId, account, setAccount, isLoading, setIsLoading }) => {
    const currentRateMdsLink = 'https://www.ratemds.com/doctor-ratings/';

    return (
        <div className="w-64 px-6 grid grid-cols-2 mt-4">
            <div className="flex flex-col items-start">
                <span className="text-reviewDrumMedGray py-2">Google</span>
                <span className="text-reviewDrumMedGray py-2">RateMDs</span>
            </div>
            <div className="flex flex-col items-start">
                <ScrapeGoogleMapsButton
                    userId={userId}
                    account={account}
                    setAccount={setAccount}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                <div className="flex flex-col items-start mt-2">
                    <ScrapeRateMdsButton
                        userId={userId}
                        account={account}
                        setAccount={setAccount}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default SidebarReviewConnector;
