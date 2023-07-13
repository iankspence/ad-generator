import React, { useState, useContext, useEffect } from 'react';
import UserContext from "../../contexts/UserContext";
import { Button } from '@mui/material';
import { CheckoutSelection } from './CheckoutSelection';
import { useRouter } from 'next/router';
import { deactivateUser } from '../../utils/api/mongo/user/register/deactivateUserApi';
import { signOut } from '../../utils/api/mongo/user/sign-in/signOutApi';

export default function AccountInfo({ accountId, refreshAccount, setRefreshAccount }) {
    const { account, user, setUser } = useContext(UserContext);
    const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
    const router = useRouter();

    const handleDeactivateAccount = async () => {
        const message = account.setupPaymentComplete ?
            "You have already completed payment. If you delete your account all of your data will be deleted and cannot be retrieved. Are you sure you want to do this?" :
            "You are about to permanently delete your account and will be signed out.  Are you sure you want to do this?";

        if (window.confirm(message)) {
            try {
                await deactivateUser({
                    userId: user._id.toString(),
                    accountId: account._id.toString(),
                });

                await signOut();
                setUser(null);
                router.push('sign-in');
            } catch (error) {
                console.error("Failed to deactivate user. Please try again later.", error);
            }
        }
    };

    const handleOpenCheckoutModal = () => {
        setOpenCheckoutModal(true);
    }

    return (
        <>
            <h1 className="text-3xl font-semibold mb-8">Account Information</h1>
            <div className="flex flex-col">

                <div className="flex">
                    <p className="font-semibold py-2 w-1/2">Company Name:</p>
                    <p className="py-2 w-1/2">{account.companyName}</p>
                </div>

                <div className="flex">
                    <p className="font-semibold py-2 w-1/2">Email:</p>
                    <p className="py-2 w-1/2">{user.email}</p>
                </div>

                <div className="flex">
                    <p className="font-semibold py-2 w-1/2">Google Reviews:</p>
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
                    <p className="font-semibold py-2 w-1/2">RateMDs Reviews:</p>
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

                { user.roles.includes('client') && (
                    <div className="flex">
                        <p className="font-semibold py-2 w-1/2">Payment:</p>

                        {account.setupPaymentComplete ?
                            <p className="py-2 w-1/2">Payment Complete</p> :
                            <div className="pb-2 pt-4 -translate-y-1.5">
                                <Button type="button" variant="contained" color="inherit" className="w-full" onClick={handleOpenCheckoutModal}>Connect Payment</Button>
                            </div>
                        }

                    </div>
                )}
            </div>

            {user.roles.includes('client') && (
                <>
                    <div className="text-right pt-4">
                        <button
                            onClick={handleDeactivateAccount}
                            className={`text-sm underline text-reviewDrumMedGray`}
                        >
                            Delete Account
                        </button>
                    </div>
                </>

            )}

            <CheckoutSelection accountId={accountId} openModal={openCheckoutModal} setOpenModal={setOpenCheckoutModal} />
        </>
    );
}
