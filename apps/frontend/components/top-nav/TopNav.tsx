import UserContext from '../../contexts/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { signOut } from '../../utils/api/mongo/user/sign-in/signOutApi';

const TopNav = () => {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            signOut();
            setUser(null);
            router.push('/sign-in');
        }
    };

    return (
        <nav className="bg-black py-2 text-white flex flex-col md:flex-row ">
            <div className="flex-1 flex flex-col md:flex-row md:justify-center w-full lg:y-4">

                {user && (user?.roles?.includes('admin') || user?.roles?.includes('content-manager') || user?.roles?.includes('client')) ? (
                    <>
                        <span
                            className={`block w-full text-center items-center  mt-2 md:my-0 md:inline-block md:mx-2
                            ${router.asPath === '/reviews' ? 'text-blue-500' : 'text-white'}`}
                        >
                            <Link href="/reviews" id="reviews">
                                Reviews
                            </Link>
                        </span>

                        {user?.roles?.includes('admin') || user?.roles?.includes('content-manager') ? (

                            <>
                                <span
                                    className={`block w-full text-center items-center  mt-2 md:my-0 md:inline-block md:mx-2
                                    ${router.asPath === '/ad-generator' ? 'text-blue-500' : 'text-white'}`}
                                >
                                <Link href="/ad-generator" id="ad-generator">
                                    Ad Generator
                                </Link>

                                </span>

                                <span
                                    className={`block w-full text-center items-center  mt-2 md:my-0 md:inline-block md:mx-2
                                    ${router.asPath === '/library' ? 'text-blue-500' : 'text-white'}`}
                                    >
                                    <Link href="/library" id="library">
                                        Library
                                    </Link>
                                </span>
                            </>

                        ) : null
                        }

                        <span
                            className={`block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2
                            ${router.asPath === '/clinic' ? 'text-blue-500' : 'text-white'}`}
                        >
                            <Link href="/account" id="account">
                                Account
                            </Link>
                        </span>

                        <span className="block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2 text-white cursor-pointer">
                            <a onClick={handleSignOut} id="signout">
                                Sign Out
                            </a>
                        </span>
                    </>
                ) : (
                    <>
                        <span
                            className={`block w-full text-center items-center md:my-0 md:inline-block md:mx-2 ${
                                router.asPath === '/learn-how' ? 'text-blue-500' : 'text-white'
                            }`}
                        >
                            <Link href="/learn-how" id="learn-how">
                                Learn How
                            </Link>
                        </span>

                        <span
                            className={`block w-full text-center items-center  mt-2 md:my-0 md:inline-block md:mx-2 ${
                                router.asPath === '/steps' ? 'text-blue-500' : 'text-white'
                            }`}
                        >
                            <Link href="/steps" id="steps">
                                Steps
                            </Link>
                        </span>

                        <span
                            className={`block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2 ${
                                router.asPath === '/pricing' ? 'text-blue-500' : 'text-white'
                            }`}
                        >
                            <Link href="/pricing" id="pricing">
                                Pricing
                            </Link>
                        </span>

                        <span
                            className={`block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2 ${
                                router.asPath === '/sign-in' ? 'text-blue-500' : 'text-white'
                            }`}
                        >
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
