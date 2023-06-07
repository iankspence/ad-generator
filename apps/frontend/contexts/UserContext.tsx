import { createContext, useState, ReactNode } from 'react';
import { AccountDocument, UserDocument } from '@monorepo/type';

interface UserContextProps {
    user: UserDocument | null;
    setUser: (user: UserDocument) => void;
    account: AccountDocument | Partial<AccountDocument> | null;
    setAccount: (account: AccountDocument | Partial<AccountDocument>) => void;
    subscriptionStatus: boolean | null;
    setSubscriptionStatus: (status: boolean) => void;
    subscriptionTier: string | null;
    setSubscriptionTier: (tier: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDocument | null>(null);
    const [account, setAccount] = useState<AccountDocument | Partial<AccountDocument> | null>(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState<boolean | null>(null);
    const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            account,
            setAccount,
            subscriptionStatus,
            setSubscriptionStatus,
            subscriptionTier,
            setSubscriptionTier,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
