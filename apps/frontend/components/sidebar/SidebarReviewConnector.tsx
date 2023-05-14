import { ScrapeGoogleMapsButton } from '../review/ScrapeGoogleMapsButton';
import ScrapeRateMdsButton from '../review/ScrapeRateMdsButton';
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
    return (
        <div className="w-3/4 px-6 py-4 flex flex-col items-start">
            <div className="w-full flex justify-between">
                <span className="text-reviewDrumMedGray text-xl py-2 font-semibold">Google</span>
                <ScrapeGoogleMapsButton
                    userId={userId}
                    account={account}
                    setAccount={setAccount}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </div>
            <div className="w-full flex justify-between mt-4">
                <span className="text-reviewDrumMedGray text-xl py-2 font-semibold">RateMDs</span>
                <ScrapeRateMdsButton
                    userId={userId}
                    account={account}
                    setAccount={setAccount}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </div>
        </div>
    );
};

export default SidebarReviewConnector;
