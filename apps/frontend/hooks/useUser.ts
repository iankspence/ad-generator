import { useEffect, useContext, useState } from 'react';
import { getAccounts } from '../utils/api/mongo/account/getAccountsApi';
import { getCurrentUser } from '../utils/api/mongo/user/sign-in/getCurrentUserApi';
import UserContext from '../contexts/UserContext';
import { findAccountByUserId } from '../utils/api/mongo/account/findAccountByUserIdApi';
import { findAccountsByManagerId } from '../utils/api/mongo/account/findAccountsByManagerIdApi';
import {
    findCustomerSubscriptionStatusByAccountId,
} from '../utils/api/mongo/customer/findCustomerSubscriptionStatusByAccountIdApi';

export const useUser = () => {
    const { user, setUser, account, setAccount, setSubscriptionStatus } = useContext(UserContext);

    const fetchAndSetSubscriptionStatus = async () => {
        if (account) {
            const status = await findCustomerSubscriptionStatusByAccountId({
                accountId: account._id.toString(),
            });
            setSubscriptionStatus(status);
        }
    };

    useEffect(() => {
        fetchAndSetSubscriptionStatus();
    }, [account]);

    const fetchAndSetDefaultAccount = async () => {
        if (!account && user && user?._id && user?.roles) {

            if (user.roles.includes('client')) {
                const account = await findAccountByUserId({
                    userId: user._id.toString(),
                });
                if (account) {
                    setAccount(account);
                }
                return;
            }

            if (user.roles.includes('content-manager')) {
                const accounts = await findAccountsByManagerId({
                    managerUserId: user._id.toString(),
                })
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
                return;
            }

            if ( user.roles.includes('admin') ) {
                const accounts = await getAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
                return;
            }
        }
    };

    useEffect(() => {
        const fetchAndSetCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchAndSetCurrentUser();
    }, []);

    useEffect(() => {
        fetchAndSetDefaultAccount();
    }, [user, account]);
};
