import { createContext, useState, useEffect } from 'react';
import {userAccount} from "../utils/api";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            userAccount(token).then((data) => {
                console.log('Context data: ', data);

                setUser(data);
            }, (error) => {
                console.log('Context error: ', error);
            });
        }
    }
    , []);
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContext;
