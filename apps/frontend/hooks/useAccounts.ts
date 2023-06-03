import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { getAccounts } from "../utils/api/mongo/account/getAccountsApi";
import { findAccountByUserId } from '../utils/api/mongo/account/findAccountByUserIdApi';
import { findAccountsByManagerId } from '../utils/api/mongo/account/findAccountsByManagerIdApi';

const useAccounts = () => {
    const { user, setAccount } = useContext(UserContext);
    const [accounts, setAccounts] = useState([]);
    const [refreshAccount, setRefreshAccount] = useState(false);

    useEffect(() => {

        if (!user || !user?.roles) return;

        const fetchAccounts = async () => {
            if (!user?._id) return;

            if (user.roles.includes('client')) {
                const clientAccount = await findAccountByUserId({
                    userId: user._id.toString(),
                });
                setAccount(clientAccount);
                return;
            }

            if (user.roles.includes('content-manager')) {
                const managedAccounts = await findAccountsByManagerId({
                    managerUserId: user._id.toString(),
                });
                setAccounts(managedAccounts);
            }

            if (user.roles.includes('admin')) {
                const allAccounts = await getAccounts();
                setAccounts(allAccounts);
                return;
            }
        };

        fetchAccounts();

    }, [user, refreshAccount]);

    return { accounts, refreshAccount, setRefreshAccount };
};

export default useAccounts;
