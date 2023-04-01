import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserContext from '../contexts/UserContext';

const TopNav = () => {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setUser(null);
        router.push('/sign-in');
    };

    return (
        <nav className="bg-black py-2 text-white flex flex-col md:flex-row w-screen">
            <div className="flex-1 flex flex-col md:flex-row md:justify-center w-full lg:y-4">
                {user ? (
                    <>
                        <span
                            className={`block w-full text-center items-center md:my-0 md:inline-block md:mx-2
                            ${router.asPath === '/dashboard' ? 'text-blue-500' : 'text-white'}`}
                        >
                            <Link href="/dashboard" id="dashboard">
                                Dashboard
                            </Link>
                        </span>

                        <span
                            className={`block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2
                            ${router.asPath === '/account' ? 'text-blue-500' : 'text-white'}`}
                        >
                            <Link href="/account" id="account">
                                Account
                            </Link>
                        </span>

                        <span
                            className="block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2 text-white cursor-pointer">
                            <a onClick={handleLogout} id="logout">
                                Logout
                            </a>
                        </span>
                    </>
                ) : (
                    <>

                        <span className={`block w-full text-center items-center md:my-0 md:inline-block md:mx-2 ${router.asPath === '/learn-how' ? 'text-blue-500' : 'text-white'}`}>
                            <Link href="/learn-how" id="learn-how">
                                Learn How
                            </Link>
                        </span>

                        <span className={`block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2 ${router.asPath === '/steps' ? 'text-blue-500' : 'text-white'}`}>
                            <Link href="/steps" id="steps">
                                Steps
                            </Link>
                        </span>

                        <span className={`block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2 ${router.asPath === '/pricing' ? 'text-blue-500' : 'text-white'}`}>
                            <Link href="/pricing" id="pricing">
                                Pricing
                            </Link>
                        </span>

                        <span className={`block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2 ${router.asPath === '/sign-in' ? 'text-blue-500' : 'text-white'}`}>
                            <Link href="/sign-in" id="sign-in">
                                Sign In
                            </Link>
                        </span>
                    </>
                )}
            </div>
        </nav>
    );
};

export default TopNav;
