import { getAccounts } from "../utils/api/mongo/account/getAccountsApi";
import { createContext, useState, useEffect, ReactNode } from 'react';
import { AccountDocument, UserDocument } from '@monorepo/type';
import { getCurrentUser } from '../utils/api/mongo/user/sign-in/getCurrentUserApi';

interface UserContextProps {
    user: UserDocument | null;
    setUser: (user: UserDocument) => void;
    account: AccountDocument | Partial<AccountDocument> | null;
    setAccount: (account: AccountDocument | Partial<AccountDocument>) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDocument | null>(null);
    const [account, setAccount] = useState<AccountDocument | Partial<AccountDocument> | null>(null);

    const fetchAndSetDefaultAccount = async () => {
        if (!account && user) {
            const accounts = await getAccounts();
            if (accounts.length > 0) {
                setAccount(accounts[0]);
            }
        }
    };

    // Fetch and set the current user when the page loads
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
    }, []); // Empty array means this effect runs once when the component mounts

    useEffect(() => {
        fetchAndSetDefaultAccount();
    }, [user, account]);

    return (
        <UserContext.Provider value={{ user, setUser, account, setAccount }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
