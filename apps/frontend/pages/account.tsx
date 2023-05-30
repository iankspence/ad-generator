import React, {useContext, useEffect, useState} from 'react';
import TopNav from '../components/top-nav/TopNav';
import UserContext from '../contexts/UserContext';
import NewAccountForm from "../components/account/NewAccountForm";
import AccountInfo from "../components/account/AccountInfo";
import SelectAccount from "../components/account/SelectAccount";
import { getAccounts } from "../utils/api/mongo/account/getAccountsApi";

export function AccountPage() {
    const { user, account, setAccount } = useContext(UserContext);

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const allAccounts = await getAccounts(user?._id);
            setAccounts(allAccounts);
        };
        fetchAccounts();
    }, [user?._id, account?.logo]);

    return (
        <>
            <TopNav />
            <div className="min-h-screen bg-reviewDrumLightGray flex items-center justify-center">

                <div className="w-1/2 bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-semibold mb-8">Account</h1>
                    <p className="font-semibold py-2">Select Account:</p>
                    <div className="py-2"></div>

                    <div className="flex justify-between">
                        <SelectAccount
                            userId={user?._id}
                            account={account}
                            setAccount={setAccount}
                            accounts={accounts}
                            setAccounts={setAccounts}
                        />

                        <NewAccountForm userId={user?._id} accounts={accounts} setAccounts={setAccounts} />
                    </div>

                    <div className="py-6"></div>
                    {account && <AccountInfo/>}
                </div>
            </div>
        </>
    );
}

export default AccountPage;
