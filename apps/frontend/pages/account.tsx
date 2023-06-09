import React, { useContext } from 'react';
import TopNav from '../components/top-nav/TopNav';
import UserContext from '../contexts/UserContext';
import NewAccountForm from "../components/account/NewAccountForm";
import AccountInfo from "../components/account/AccountInfo";
import SelectAccount from "../components/account/SelectAccount";
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import NoAccess from '../components/loading-screen/NoAccess';
import { useUser } from '../hooks/useUser';
import { deleteAccount } from '../utils/api/mongo/account/deleteAccountApi';
import UnassignedAccountPicker from '../components/account/UnassignedAccountPicker';
import useAccounts from '../hooks/useAccounts';
import { deactivateUser } from '../utils/api/mongo/user/register/deactivateUserApi';
import { signOut } from '../utils/api/mongo/user/sign-in/signOutApi';
import { useRouter } from 'next/router';

export function AccountPage() {
    const { user, account, setAccount, subscriptionStatus, setUser } = useContext(UserContext);
    const { accounts, refreshAccount, setRefreshAccount } = useAccounts();
    const router = useRouter();
    useUser();

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
            "You are about to permanently delete your account and sign out - are you sure you want to do this?";

        if (window.confirm(message)) {
            try {
                const newUser = await deactivateUser({
                    userId: user._id.toString(),
                });

                if (!subscriptionStatus) {
                    await signOut();
                    setUser(null);
                    await router.push('/sign-in');
                } else {
                    setUser(newUser);
                }

            } catch (error) {
                console.error("Failed to deactivate user. Please try again later.", error);
            }
        }
    };

    if (!user || !user?.roles) {
        return <LoadingScreen />;
    }

    if (!user?.roles.includes('admin') && !user?.roles.includes('content-manager') && !user?.roles.includes('client')) {
        return <NoAccess />;
    }

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex items-center justify-center">
                <div className="w-1/2 bg-white rounded-lg shadow-lg p-8">

                    { subscriptionStatus && user && !user.isActive && (
                        <div className="pt-2 text-right">
                            <span className="text-sm text-red-500">
                                Warning: Your access will end at the end of the current billing cycle.
                            </span>
                        </div>
                    )}


                    { (user.roles.includes('admin') || user.roles.includes('content-manager')) ?
                        <div className="pb-8">
                            <h1 className="text-3xl font-semibold">Account</h1>
                            <p className="font-semibold py-2">Select Account:</p>
                            <div className="py-2"></div>
                            <div className="flex justify-between">
                                <SelectAccount
                                    account={account}
                                    setAccount={setAccount}
                                    accounts={accounts}
                                />
                                <NewAccountForm
                                    userId={user?._id}
                                    refreshAccount={refreshAccount}
                                    setRefreshAccount={setRefreshAccount}
                                />
                            </div>
                            <UnassignedAccountPicker />
                            {user.roles.includes('admin') && (
                                <div className="pt-2 text-right">
                                    <button
                                        onClick={handleAdminDeleteAccount}
                                        className={`text-sm underline ${account ? 'text-red-500' : 'text-gray-500'}`}
                                        disabled={!account}
                                    >
                                        Delete Account (Admin Only)
                                    </button>
                                </div>
                            )}
                        </div>

                        : <></>
                    }

                    {user.roles.includes('client') && (
                        <div className="pt-2 text-right">
                            <button
                                onClick={handleDeactivateAccount}
                                className={`text-sm underline ${account ? 'text-red-500' : 'text-gray-500'}`}
                                disabled={!account}
                            >
                                {subscriptionStatus ? "Delete Account and End Subscription" : "Delete Account"}
                            </button>
                        </div>
                    )}

                    {account && <AccountInfo accountId={account._id} refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount} />}
                </div>
            </div>
        </>
    );
}

export default AccountPage;
