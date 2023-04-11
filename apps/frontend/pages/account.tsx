import { ScrapeGoogleMapsButton } from '../components/ScrapeGoogleMapsButton';
import { ScrapeRateMdsButton } from '../components/ScrapeRateMdsButton';
import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import { getAccountByUserId } from '../utils/api';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

export function AccountPage() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        // set the account for the user
        if (user) {
            console.log('use effect user', user);

            getAccountByUserId(user._id).then((account) => {
                console.log('account', account);
                setAccount(account);
            });
        }
    }, [user]);

    return (
        <>
            <TopNav />
            <div className="bg-black min-h-screen text-white px-8 py-12 flex flex-col items-center justify-center">
                {account && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="py-4">Google Query:</p>
                                <p className="py-4">RateMDs Link(s):</p>
                            </div>
                            <div>
                                {account.googleQuery && account ? (
                                    <ul className="py-4">{account.googleQuery}</ul>
                                ) : (
                                    <ul className="py-2">
                                        <ScrapeGoogleMapsButton
                                            userId={user._id}
                                            accountId={account._id}
                                            setAccount={setAccount}
                                        />
                                    </ul>
                                )}
                                <ul className="py-2">
                                    <ScrapeRateMdsButton
                                        userId={user._id}
                                        accountId={account._id}
                                        setAccount={setAccount}
                                    />
                                </ul>
                                {account.rateMdsLinks?.[0] && account && (
                                    <ul className="py-2">
                                        {account.rateMdsLinks.map((link, index) => (
                                            <li key={index}>{link}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default AccountPage;
