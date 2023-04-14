import ProcessedReviewChart, { data } from '../components/ProcessedReviewChart';
import { ScrapeGoogleMapsButton } from '../components/ScrapeGoogleMapsButton';
import { ScrapeRateMdsButton } from '../components/ScrapeRateMdsButton';
import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import useAccount from '../hooks/useAccount';
import { WebsocketHandler } from '../utils/websocket/WebsocketHandler';
import handleProcessedReview from '../utils/websocket/handleProcessedReview';
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export function AccountPage() {
    const { user } = useContext(UserContext);
    const { account } = useAccount(user?._id);

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex items-center justify-center">
                <div className="text-reviewDrumDarkGray ">
                    <div className="flex">
                        <div className="w-1/2">
                            <p className="py-4">Google:</p>
                            <p className="py-4">RateMDs:</p>
                        </div>
                        <div className="w-1/2">
                            {account ? (
                                account.googleQuery ? (
                                    <p className="py-4">{account.googleQuery}</p>
                                ) : (
                                    <p className="py-4">Not Connected</p>
                                )
                            ) : (
                                <br />
                            )}
                            {account ? (
                                account.rateMdsLinks ? (
                                    <ul className="py-4 break-all">
                                        {account.rateMdsLinks.map((link, index) => (
                                            <li key={index}>{link}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="py-4">Not Connected</p>
                                )
                            ) : (
                                <br />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountPage;
