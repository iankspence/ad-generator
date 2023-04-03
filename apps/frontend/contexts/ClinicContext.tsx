import { getClinics } from '../utils/api';
import UserContext from './UserContext';
import { createContext } from 'react';
import React, { useState, useEffect, useContext } from 'react';

const ClinicContext = createContext(null);

export const ClinicProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (user && token) {
            getClinics(token, user._id).then(
                (data) => {
                    setClinics(data);
                },
                (error) => {
                    console.log('Clinic Context Error: ', error);
                },
            );
        } else {
            setClinics(clinics);
        }
    }, [user]);

    return <ClinicContext.Provider value={{ clinics, setClinics }}>{children}</ClinicContext.Provider>;
};

export default ClinicContext;
