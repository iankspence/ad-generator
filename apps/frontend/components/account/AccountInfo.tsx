import React, { useState, useContext, useEffect } from 'react';
import UserContext from "../../contexts/UserContext";
import { Button } from '@mui/material';
import { CheckoutSelection } from './CheckoutSelection';
import { useRouter } from 'next/router';
import { deactivateUser } from '../../utils/api/mongo/user/register/deactivateUserApi';
import { signOut } from '../../utils/api/mongo/user/sign-in/signOutApi';
import ChangeSubscription from './ChangeSubscription';
import { reactivateUser } from '../../utils/api/mongo/user/register/reactivateUserApi';
import { reactivateSubscription } from '../../utils/api/mongo/customer/reactivateSubscriptionApi';
import { deactivateSubscription } from '../../utils/api/mongo/customer/deactivateSubscriptionApi';
import { findNextBillingDateByAccountId } from '../../utils/api/mongo/customer/findNextBillingDateByAccountIdApi';

export default function AccountInfo({ accountId, refreshAccount, setRefreshAccount }) {
    const { account, user, subscriptionStatus, setUser, subscriptionTier } = useContext(UserContext);
    const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
    const [openChangeSubscriptionModal, setOpenChangeSubscriptionModal ] = useState(false);
    const [ nextBillingDate, setNextBillingDate ] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const findNextBillingDate = async () => {
            try {
                const nextBillingDate = await findNextBillingDateByAccountId({
                    accountId: account._id.toString(),
                    city: account.city,
                    provinceState: account.provinceState,
                });

                setNextBillingDate(nextBillingDate);
            } catch (error) {
                console.error("Failed to find next billing date. Please try again later.", error);
            }
        };

        if (!account || !subscriptionStatus) return;

        findNextBillingDate();
    }, [account, subscriptionStatus]);


    const handleDeactivateAccount = async () => {
        const message = subscriptionStatus ?
            "You currently have an ongoing subscription. If you cancel your account and subscription, you will lose access to your account at the end of the current billing cycle.  Are you sure you want to do this?" :
            "You are about to permanently delete your account and will be signed out.  Are you sure you want to do this?";

        if (window.confirm(message)) {
            try {

                await deactivateSubscription({
                    accountId: account._id.toString(),
                });

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

    const handleReactivateSubscription = async () => {
        if (window.confirm("Are you sure you want to reactivate your subscription?  You will continue to be charged according to your previous billing cycle.")) {
            try {

                await reactivateSubscription({
                    accountId: account._id.toString(),
                });

                if (!account.isActive) {
                    await reactivateUser({
                        userId: user._id.toString(),
                        accountId: account._id.toString(),
                    });
                    setRefreshAccount(!refreshAccount);
                }

            } catch (error) {
                console.error("Failed to reactivate subscription. Please try again later.", error);
            }
        }
    }

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

                <div className="flex">
                    <p className="font-semibold py-2 w-1/2">Service Renewal:</p>

                    {subscriptionStatus && account && account.isActive ? (
                        <p className="py-2 w-1/2">{nextBillingDate}</p>
                    ) : (
                        <p className="py-2 w-1/2">N/A</p>
                    )}
                </div>


                { user.roles.includes('client') && (
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

            {user.roles.includes('client') && (
                <>
                    {subscriptionStatus && account && account.isActive && (
                        <>
                            <div className="text-right pt-12">
                                <button
                                    onClick={handleChangeSubscription}
                                    className={`text-sm underline text-reviewDrumDarkGray`}
                                >
                                    Change Subscription
                                </button>
                            </div>

                            <div className="text-right pt-4">
                                <button
                                    onClick={handleDeactivateAccount}
                                    className={`text-sm underline text-reviewDrumMedGray`}
                                >
                                    Cancel Subscription
                                </button>
                            </div>
                        </>
                    )}

                    {!subscriptionStatus && account && account.isActive && (
                        <div className="text-right pt-4">
                            <button
                                onClick={handleDeactivateAccount}
                                className={`text-sm underline text-reviewDrumMedGray`}
                            >
                                Delete Account
                            </button>
                        </div>
                    )}


                    {subscriptionStatus && account && !account.isActive && (
                        <>
                            <div className="text-right pt-4">
                                <button
                                    onClick={handleReactivateSubscription}
                                    className={`text-sm underline text-reviewDrumMedGray`}
                                >
                                    Reactivate Subscription
                                </button>

                            </div>
                            <div className="text-right">
                                <span className="text-sm text-reviewDrumDarkGray">
                                    Warning: Your account will be deleted at the end of the current billing cycle.
                                </span>
                            </div>
                        </>
                    )}

                </>
            )}

            <CheckoutSelection accountId={accountId} openModal={openCheckoutModal} setOpenModal={setOpenCheckoutModal} />
            <ChangeSubscription accountId={accountId} userId={user?._id.toString()} openModal={openChangeSubscriptionModal} setOpenModal={setOpenChangeSubscriptionModal} refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount} />
        </>
    );
}
