import UserContext from '../../contexts/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { signOut } from '../../utils/api/mongo/user/sign-in/signOutApi';
import LinkItem from './LinkItem';

const TopNav = () => {
    const router = useRouter();
    const { user, setUser, subscriptionStatus } = useContext(UserContext);

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

                        {user && (user?.roles?.includes('admin') || user?.roles?.includes('content-manager') || user?.roles?.includes('client') && subscriptionStatus) ?
                            <LinkItem href="/reviews">Reviews</LinkItem>
                            : null
                        }

                        {user?.roles?.includes('admin') || user?.roles?.includes('content-manager') ? (
                            <>
                                <LinkItem href="/ad-generator">Ad Generator</LinkItem>
                                <LinkItem href="/library">Library</LinkItem>
                            </>
                        ) : null
                        }
                        <LinkItem href="/account">Account</LinkItem>

                        <span className="block w-full text-center items-center mt-2 md:my-0 md:inline-block md:mx-2 text-white cursor-pointer">
                            <a onClick={handleSignOut} id="signout">
                                Sign Out
                            </a>
                        </span>

                    </>
                ) : (
                    <>
                        <LinkItem href="/learn-how">Learn How</LinkItem>
                        <LinkItem href="/steps">Steps</LinkItem>
                        <LinkItem href="/pricing">Pricing</LinkItem>
                        <LinkItem href="/sign-in">Sign In</LinkItem>
                    </>
                )}
            </div>
        </nav>
    );
};

export default TopNav;
