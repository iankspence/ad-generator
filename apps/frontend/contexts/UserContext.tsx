import { getAccounts } from "../utils/api/mongo/account/getAccountsApi";
import { createContext, useState, useEffect, ReactNode } from 'react';
import { AccountDocument, UserDocument } from '@monorepo/type';
import { getCurrentUser } from '../utils/api/mongo/user/sign-in/getCurrentUserApi';

interface UserContextProps {
    user: UserDocument | null;
    setUser: (user: UserDocument) => void;
    roles: string[] | null;
    setRoles: (roles: string[]) => void;
    account: AccountDocument | Partial<AccountDocument> | null;
    setAccount: (account: AccountDocument | Partial<AccountDocument>) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDocument | null>(null);
    const [roles, setRoles] = useState<string[] | null>(null);
    const [account, setAccount] = useState<AccountDocument | Partial<AccountDocument> | null>(null);

    const fetchAndSetDefaultAccount = async () => {
        if (!account && user) {
            const accounts = await getAccounts();
            if (accounts.length > 0) {
                setAccount(accounts[0]);
            }
        }
    };

    useEffect(() => {
        const fetchAndSetCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                setRoles(currentUser.roles)
                console.log('Current user:', currentUser);
                console.log('Current user roles:', currentUser.roles)
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchAndSetCurrentUser();
    }, []);

    useEffect(() => {
        fetchAndSetDefaultAccount();
    }, [user, account]);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            roles,
            setRoles,
            account,
            setAccount }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
