import React, { useState, useContext } from 'react';
import LogoUpload from './LogoUpload';
import UserContext from "../../contexts/UserContext";
import { Button } from '@mui/material';
import { CheckoutSelection } from './CheckoutSelection';
import { useRouter } from 'next/router';
import { deactivateUser } from '../../utils/api/mongo/user/register/deactivateUserApi';
import { deleteAccount } from '../../utils/api/mongo/account/deleteAccountApi';
import { signOut } from '../../utils/api/mongo/user/sign-in/signOutApi';
import ChangeSubscription from './ChangeSubscription';

export default function AccountInfo({ accountId, refreshAccount, setRefreshAccount }) {
    const { account, user, subscriptionStatus, setUser, subscriptionTier } = useContext(UserContext);
    const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
    const [openChangeSubscriptionModal, setOpenChangeSubscriptionModal ] = useState(false);

    const router = useRouter();

    const handleAdminDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete this account? This operation cannot be undone.")) {
            try {
                await deleteAccount({
                    accountId: account._id.toString(),
                });
                setRefreshAccount(!refreshAccount);
            } catch (error) {
                console.error("Failed to delete account. Please try again later.", error);
            }
        }
    };

    const handleDeactivateAccount = async () => {
        const message = subscriptionStatus ?
            "You currently have an ongoing subscription. If you cancel your account and subscription, you will lose access to your account at the end of the current billing cycle." :
            "You are about to permanently delete your account and will be signed out - are you sure you want to do this?";

        if (window.confirm(message)) {
            try {
                await deactivateUser({
                    userId: user._id.toString(),
                    accountId: account._id.toString(),
                });

                if (!subscriptionStatus) {
                    await signOut();
                    setUser(null);
                    router.push('sign-in');
                } else {
                    setRefreshAccount(!refreshAccount);
                }

            } catch (error) {
                console.error("Failed to deactivate user. Please try again later.", error);
            }
        }
    };

    const handleChangeSubscription = () => {
        setOpenChangeSubscriptionModal(true);
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

                {user.roles.includes('client') && (
                    <div className="flex">
                        {subscriptionStatus ?
                            <p className="font-semibold py-2 w-1/2">Subscription Tier:</p> :
                            <p className="font-semibold py-2 w-1/2">Payment:</p>
                        }
                        {subscriptionStatus ?
                            <p className="py-2 w-1/2">{subscriptionTier}</p> :
                            <div className="pb-2 pt-4 -translate-y-1.5">
                                <Button type="button" variant="contained" color="inherit" className="w-full" onClick={handleOpenCheckoutModal}>Connect Payment</Button>
                            </div>
                        }
                    </div>
                )}

            </div>

            {account && (
                <div className="flex mt-2">
                    <div className="w-full">
                        <LogoUpload refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount}/>
                    </div>
                </div>
            )}

            {user.roles.includes('client') && (
                <>
                    <div className="text-right pt-12">
                        {subscriptionStatus && (
                            <button
                                onClick={handleChangeSubscription}
                                className={`text-sm underline text-reviewDrumDarkGray`}
                            >
                                Change Subscription
                            </button>
                        )}
                    </div>

                    <div className="text-right pt-4">
                        <button
                            onClick={handleDeactivateAccount}
                            className={`text-sm underline text-reviewDrumMedGray`}
                            disabled={!account}
                        >
                            {subscriptionStatus ? "Cancel Subscription" : "Delete Account"}
                        </button>
                    </div>

                    <div className="text-right">
                        {subscriptionStatus && account && !account.isActive && (
                            <span className="text-sm text-reviewDrumDarkGray">
                                Warning: Your access will end at the end of the current billing cycle.
                            </span>
                        )}
                    </div>

                </>
            )}

            {user.roles.includes('admin') && (
                <button
                    onClick={handleAdminDeleteAccount}
                    className={`text-sm underline text-red-500`}
                    disabled={!account}
                >
                    Delete Account (Admin Only)
                </button>
            )}

            <CheckoutSelection accountId={accountId} openModal={openCheckoutModal} setOpenModal={setOpenCheckoutModal} />
            <ChangeSubscription accountId={accountId} openModal={openChangeSubscriptionModal} setOpenModal={setOpenChangeSubscriptionModal} />
        </>
    );
}
