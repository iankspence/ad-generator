import { userAccount, getAccounts } from '../utils/api';
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [account, setAccount] = useState(null);

    const fetchAndSetDefaultAccount = async () => {
        if (!account && user) {
            const accounts = await getAccounts(user._id);
            if (accounts.length > 0) {
                setAccount(accounts[0]);
            }
        }
    };

    // Fetch account when the user changes
    useEffect(() => {
        fetchAndSetDefaultAccount();
    }, [user, account]);

    const refreshToken = async () => {
        const token = localStorage.getItem('userToken');
        if (token) {
            const data = await userAccount(token);
            console.log('Context data: ', data);
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
