import { useEffect } from 'react';
import Router from 'next/router';

const useAuth = () => {
    useEffect(() => {
        if (!localStorage.getItem('userToken')) {
            Router.push('/sign-in');
        }
    }, []);
};

export default useAuth;
