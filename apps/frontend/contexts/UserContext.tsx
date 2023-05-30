import { getAccounts } from "../utils/api/mongo/account/getAccountsApi";
import { userJwt } from '../utils/api/mongo/user/sign-in/userJwtApi';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { AccountDocument, UserDocument } from '@monorepo/type';

interface UserContextProps {
    user: UserDocument | null;
    setUser: (user: UserDocument) => void;

    account: AccountDocument | Partial<AccountDocument> | null;
    setAccount: (account: AccountDocument | Partial<AccountDocument>) => void;

    refreshToken: () => Promise<void>;
}

// Removed default values
const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDocument | null>(null);
    const [account, setAccount] = useState<AccountDocument | Partial<AccountDocument> | null>(null);

    const fetchAndSetDefaultAccount = async () => {
        if (!account && user) {
            const accounts = await getAccounts(user._id);
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                console.log('Setting default account: ', accounts[0])
            }
        }
    };

    useEffect(() => {
        fetchAndSetDefaultAccount();
    }, [user, account]);

    const refreshToken = async () => {
        const token = localStorage.getItem('userToken');
        if (token) {
            const data = await userJwt(token);
            setUser(data);
        }
    };

    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, account, setAccount, refreshToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
