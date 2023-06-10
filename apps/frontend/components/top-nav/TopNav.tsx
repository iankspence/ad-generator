import UserContext from '../../contexts/UserContext';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { signOut } from '../../utils/api/mongo/user/sign-in/signOutApi';
import { LinkItem } from './LinkItem';

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
            <div className="flex-1 flex justify-center sm:justify-end md:flex-wrap md:items-center w-full lg:y-4">
                {user && (user?.roles?.includes('admin') || user?.roles?.includes('content-manager') || user?.roles?.includes('client')) ? (
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:pr-12">
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

                        <span className="inline-block ml-2 text-white cursor-pointer">
                            <a onClick={handleSignOut} id="signout">
                                Sign Out
                            </a>
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-10 sm:pr-12">
                        <LinkItem href="/learn-how">Learn How</LinkItem>
                        <LinkItem href="/steps">Steps</LinkItem>
                        <LinkItem href="/pricing">Pricing</LinkItem>
                        <LinkItem href="/sign-in">Sign In</LinkItem>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default TopNav;
