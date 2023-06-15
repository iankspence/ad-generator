import { useEffect, useContext } from 'react';
import { getAccounts } from '../utils/api/mongo/account/getAccountsApi';
import { getCurrentUser } from '../utils/api/mongo/user/sign-in/getCurrentUserApi';
import UserContext from '../contexts/UserContext';
import { findAccountByUserId } from '../utils/api/mongo/account/findAccountByUserIdApi';
import { findAccountsByManagerId } from '../utils/api/mongo/account/findAccountsByManagerIdApi';
import {
    findCustomerSubscriptionStatusByAccountId,
} from '../utils/api/mongo/customer/findCustomerSubscriptionStatusByAccountIdApi';
import { findSubscriptionTierByPriceId } from '../utils/api/mongo/customer/findSubscriptionTierByPriceId';
import { useRouter } from 'next/router';

export const useUser = () => {
    const { user, setUser, account, setAccount, setSubscriptionStatus, setSubscriptionTier } = useContext(UserContext);
    const router = useRouter();

    const fetchAndSetSubscriptionStatus = async () => {
        if (account) {
            const { active, priceId } = await findCustomerSubscriptionStatusByAccountId({
                accountId: account._id.toString(),
            });
            setSubscriptionStatus(active);
            const subscriptionTier = findSubscriptionTierByPriceId(priceId);
            setSubscriptionTier(subscriptionTier);
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

            const accountIndex = Number(sessionStorage.getItem('accountIndex')) || 0;

            if (user.roles.includes('content-manager')) {
                const accounts = await findAccountsByManagerId({
                    managerUserId: user._id.toString(),
                })
                if (accounts.length > 0) {
                    setAccount(accounts[accountIndex]);
                }
                return;
            }

            if (user.roles.includes('admin')) {
                const accounts = await getAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[accountIndex]);
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
                if (error.response && error.response.status === 401) {
                    router.push('/sign-in');
                }
            }
        };

        fetchAndSetCurrentUser();
    }, []);


    useEffect(() => {
        fetchAndSetDefaultAccount();
    }, [user, account]);
};
