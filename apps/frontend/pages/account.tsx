import React, {useContext, useEffect, useState} from 'react';
import TopNav from '../components/top-nav/TopNav';
import UserContext from '../contexts/UserContext';
import NewAccountForm from "../components/account/NewAccountForm";
import AccountInfo from "../components/account/AccountInfo";
import SelectAccount from "../components/account/SelectAccount";
import { getAccounts } from "../utils/api/mongo/account/getAccountsApi";
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import NoAccess from '../components/loading-screen/NoAccess';
import { useUser } from '../hooks/useUser';
import { findAccountByUserId } from '../utils/api/mongo/account/findAccountByUserId';

export function AccountPage() {
    const { user, account, setAccount } = useContext(UserContext);

    const [accounts, setAccounts] = useState([]);
    const [ refreshAccount, setRefreshAccount ] = useState(false);

    useUser();

    useEffect(() => {

        if (!user || !user?.roles) return;

        const fetchAccounts = async () => {
            if (!user?._id) return;

            if (user.roles.includes('admin') || user.roles.includes('content-manager')) {
                const allAccounts = await getAccounts();
                setAccounts(allAccounts);
                return;
            }

            if (user.roles.includes('client')) {
                const clientAccount = await findAccountByUserId({
                    userId: user._id.toString(),
                });
                setAccount(clientAccount);
                return;
            }
        };

        fetchAccounts();

    }, [user, refreshAccount]);


    // const handleDeleteAccount = async () => {
    //     if (window.confirm("Are you sure you want to delete this account? This operation cannot be undone.")) {
    //         try {
    //             await deleteAccount(account._id); // you should replace `deleteAccount` with the actual API call you use for deleting an account
    //             setRefreshAccount(!refreshAccount); // force to re-fetch the accounts
    //         } catch (error) {
    //             console.error("Failed to delete account. Please try again later.", error);
    //         }
    //     }
    // };

    if ( !user || !user?.roles ) return <LoadingScreen />;

    if (!user?.roles.includes('admin') && !user?.roles.includes('content-manager') && !user?.roles.includes('client')) {
        return <NoAccess />;
    }

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex items-center justify-center">

                <div className="w-1/2 bg-white rounded-lg shadow-lg p-8">


                    { (user.roles.includes('admin') || user.roles.includes('content-manager')) ?
                        <>
                            <h1 className="text-3xl font-semibold">Account</h1>
                            <p className="font-semibold py-2">Select Account:</p>
                            <div className="py-2"></div>

                            <div className="flex justify-between pb-8">
                                <SelectAccount
                                    userId={user?._id}
                                    account={account}
                                    setAccount={setAccount}
                                    accounts={accounts}
                                    setAccounts={setAccounts}
                                />

                                <NewAccountForm userId={user?._id} accounts={accounts} setAccounts={setAccounts} />
                            </div>
                        </>

                        : <></>
                    }



                    {account && <AccountInfo refreshAccount={refreshAccount} setRefreshAccount={setRefreshAccount}/>}
                </div>
            </div>
        </>
    );
}

export default AccountPage;
