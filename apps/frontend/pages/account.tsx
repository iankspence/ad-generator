import React, { useContext } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import UserContext from '../contexts/UserContext';
import AccountInfo from "../components/account/AccountInfo";
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import { useUser } from '../hooks/useUser';
import useAccounts from '../hooks/useAccounts';
import PrivateAccountButton  from '../components/account/PrivateAccountButton';

export function AccountPage() {
    const { user, account } = useContext(UserContext);
    const { refreshAccount, setRefreshAccount } = useAccounts();

    useUser();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!user || !user?.roles) {
        return <LoadingScreen />;
    }

    return (
        <>
            <div className="min-h-screen bg-reviewDrumLightGray flex items-center justify-center">
                <div className={`${isMobile ? 'w-11/12' : 'w-1/2'} ${isMobile ? 'text-xs' : 'text-md'} bg-white rounded-lg shadow-lg ${isMobile ? 'p-4' : 'p-8'}`}>

                    {(user?.roles.includes('admin') || user?.roles.includes('content-manager')) &&
                        <PrivateAccountButton/>
                    }

                    {account && <AccountInfo accountId={account._id} refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount} />}
                </div>
            </div>
        </>
    );
}

export default AccountPage;
