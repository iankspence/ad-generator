import { createContext, useState, ReactNode } from 'react';
import { AccountDocument, UserDocument } from '@monorepo/type';

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

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            account,
            setAccount,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
