import UserContext from './UserContext';
import { createContext } from 'react';
import React, { useState, useEffect, useContext } from 'react';

const SelectedClinicContext = createContext(null);

export const SelectedClinicProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [selectedClinic, setSelectedClinic] = useState(null);

    useEffect(() => {
        if (!user) {
            setSelectedClinic(null);
        }
    }, [user]);

    return (
        <SelectedClinicContext.Provider value={{ selectedClinic, setSelectedClinic }}>
            {children}
        </SelectedClinicContext.Provider>
    );
};

export default SelectedClinicContext;
