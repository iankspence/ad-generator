import React, { useContext } from 'react';
import TopNav from '../components/nav-bars/TopNav';
import UserContext from '../contexts/UserContext';
import AccountInfo from "../components/account/AccountInfo";
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import { useUser } from '../hooks/useUser';
import useAccounts from '../hooks/useAccounts';
import PrivateAccountButton  from '../components/account/PrivateAccountButton';
import BottomNav from '../components/nav-bars/BottomNav';

export function AccountPage() {
    const { user, account } = useContext(UserContext);
    const { refreshAccount, setRefreshAccount } = useAccounts();

    useUser();

    if (!user || !user?.roles) {
        return <LoadingScreen />;
    }

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex items-center justify-center">
                <div className="w-1/2 bg-white rounded-lg shadow-lg p-8">

                    {(user?.roles.includes('admin') || user?.roles.includes('content-manager')) &&
                        <PrivateAccountButton/>
                    }

                    {account && <AccountInfo accountId={account._id} refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount} />}
                </div>
            </div>
            <BottomNav />
        </>
    );
}

export default AccountPage;
