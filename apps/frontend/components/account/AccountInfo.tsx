import React, {useContext } from 'react';
import LogoUpload from './LogoUpload';
import UserContext from "../../contexts/UserContext";
import { Button } from '@mui/material';

export default function AccountInfo({ refreshAccount, setRefreshAccount, handleOpenModal }) {
    const { account, user, subscriptionStatus, subscriptionTier } = useContext(UserContext);

    return (
        <>
            <h1 className="text-3xl font-semibold mb-8">Account Information</h1>
            <div className="flex flex-col">

                {user.roles.includes('client') && (
                    <div className="flex">
                        {subscriptionStatus ?
                            <p className="font-semibold py-2 w-1/2">Subscription Tier:</p> :
                            <p className="font-semibold py-2 w-1/2">Payment:</p>
                        }
                        {subscriptionStatus ?
                            <p className="py-2 w-1/2">{subscriptionTier}</p> :
                            <div className="py-2 -translate-y-1.5">
                                <Button type="button" variant="contained" color="inherit" className="w-full" onClick={handleOpenModal}>Connect Payment</Button>
                            </div>
                        }
                    </div>
                )}

                <div className="flex">
                    <p className="font-semibold py-2 w-1/2">Google:</p>
                    {account ? (
                        account.googleQuery ? (
                            <p className="py-2 w-1/2">{account.googleQuery}</p>
                        ) : (
                            <p className="py-2 w-1/2">Not Connected</p>
                        )
                    ) : (
                        <br />
                    )}
                </div>

                <div className="flex">
                    <p className="font-semibold py-2 w-1/2">RateMDs:</p>
                    {account ? (
                        account.rateMdsLinks?.[0] ? (
                            <ul className="py-2 w-1/2 break-all">
                                {account.rateMdsLinks.map((link, index) => (
                                    <li key={index}>{link}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="py-2 w-1/2">Not Connected</p>
                        )
                    ) : (
                        <br />
                    )}
                </div>

            </div>

            {account && (
                <div className="flex mt-2">
                    <div className="w-full">
                        <LogoUpload refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount}/>
                    </div>
                </div>
            )}
        </>
    );
}
