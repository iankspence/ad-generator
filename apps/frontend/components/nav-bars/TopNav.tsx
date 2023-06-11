import UserContext from '../../contexts/UserContext';
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
        <nav className="bg-reviewDrumDarkGray py-2 text-white flex flex-col md:flex-row justify-between items-center sticky top-0 z-50">
            <div className="mb-2 md:mb-0 md:pl-3">
                <LinkItem href="/">
                    <span className="text-reviewDrumMedGray">Review</span>
                    <span className="text-reviewDrumOrange">Drum</span>
                </LinkItem>
            </div>
            <div className="md:flex md:flex-row md:justify-end md:items-center w-full">
                {user && (user?.roles?.includes('admin') || user?.roles?.includes('content-manager') || user?.roles?.includes('client')) ? (
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:pr-12">
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
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 md:pr-12">
                        <LinkItem href="/learn-more">Learn More</LinkItem>
                        <LinkItem href="/pricing">Pricing</LinkItem>
                        <LinkItem href="/sign-in">Sign In</LinkItem>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default TopNav;
