import React, { useContext, useEffect } from 'react';
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

export function AccountPage() {
    const { user, account, setAccount } = useContext(UserContext);
    const { accounts, refreshAccount, setRefreshAccount } = useAccounts();
    useUser();

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete this account? This operation cannot be undone.")) {
            try {
                await deleteAccount({
                    accountId: account._id.toString(),
                });
                setRefreshAccount(!refreshAccount); // force to re-fetch the accounts
            } catch (error) {
                console.error("Failed to delete account. Please try again later.", error);
            }
        }
    };

    const statusChangeCallback = (response) => {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            console.log('connected');
            testAPI();
        } else {
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this webpage.';
        }
    };

    useEffect(() => {
        console.log('useEffect: ', process.env.NEXT_PUBLIC_FACEBOOK_APP_ID);
        if (window.FB) {
            window.FB.XFBML.parse();
        } else {
            // Asynchronously load the Facebook SDK
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0&appId=" + process.env.NEXT_PUBLIC_FACEBOOK_APP_ID + "&autoLogAppEvents=1";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            // Listen for the Facebook SDK to load and then initialize it
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                    cookie: true,
                    xfbml: true,
                    version: 'v17.0'
                });

                // Bind the FB.login() function to the click event of the login button
                const loginButton = document.querySelector('.fb-login-button');
                if (loginButton) {
                    loginButton.addEventListener('click', function () {
                        window.FB.login(function(response) {
                            statusChangeCallback(response);
                        }, { scope: 'public_profile', auth_type: 'reauthenticate', redirect_uri: 'https://dev.reviewdrum.com/account' });
                    });
                }
            };

        }
    }, []);

    const testAPI = () => {
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });
    }

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
                                        onClick={handleDeleteAccount}
                                        className={`text-sm underline ${account ? 'text-red-500' : 'text-gray-500'}`}
                                        disabled={!account}
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            )}
                        </div>

                        : <></>
                    }
                    {account && <AccountInfo refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount}/>}
                </div>
                <div className="AccountPage">
                    <div
                        className="fb-login-button"
                        data-width=""
                        data-size="large"
                        data-button-type="continue_with"
                        data-layout="default"
                        data-auto-logout-link="false"
                        data-use-continue-as="true"
                    />
                    <div id="status"></div>
                </div>
            </div>
        </>
    );
}

export default AccountPage;
