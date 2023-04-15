import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import useAccount from '../hooks/useAccount';
import React, { useContext, useEffect, useState } from 'react';

export function AccountPage() {
    const { user } = useContext(UserContext);
    const { account } = useAccount(user?._id);

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex items-center justify-center">
                <div className="text-reviewDrumDarkGray ">
                    <h1 className="text-3xl font-semibold mb-8">Account Information</h1>
                    <div className="flex">
                        <div className="w-1/2">
                            <p className="font-semibold py-2">Google:</p>
                            <p className="font-semibold py-2">RateMDs:</p>
                        </div>
                        <div className="w-1/2">
                            {account ? (
                                account.googleQuery ? (
                                    <p className="py-2">{account.googleQuery}</p>
                                ) : (
                                    <p className="py-2">Not Connected</p>
                                )
                            ) : (
                                <br />
                            )}
                            {account ? (
                                account.rateMdsLinks?.[0] ? (
                                    <ul className="py-2 break-all">
                                        {account.rateMdsLinks.map((link, index) => (
                                            <li key={index}>{link}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="py-2">Not Connected</p>
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
