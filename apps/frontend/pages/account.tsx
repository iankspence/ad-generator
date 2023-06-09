import React, { useContext } from 'react';
import TopNav from '../components/top-nav/TopNav';
import UserContext from '../contexts/UserContext';
import NewAccountForm from "../components/account/NewAccountForm";
import AccountInfo from "../components/account/AccountInfo";
import SelectAccount from "../components/account/SelectAccount";
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import NoAccess from '../components/loading-screen/NoAccess';
import { useUser } from '../hooks/useUser';
import UnassignedAccountPicker from '../components/account/UnassignedAccountPicker';
import useAccounts from '../hooks/useAccounts';

export function AccountPage() {
    const { user, account, setAccount } = useContext(UserContext);
    const { accounts, refreshAccount, setRefreshAccount } = useAccounts();
    useUser();

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

                    { ((user.roles.includes('admin') || user.roles.includes('content-manager'))) &&
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
                        </div>
                    }

                    {account && <AccountInfo accountId={account._id} refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount} />}
                </div>
            </div>
        </>
    );
}

export default AccountPage;
