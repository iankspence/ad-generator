import React, { useState, CSSProperties, useContext, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import UserContext from '../../contexts/UserContext';
import { useRouter } from 'next/router';
import { signOut } from '../../utils/api/mongo/user/sign-in/signOutApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LinkItem from './LinkItem';

const TopNav = () => {
    const router = useRouter();
    const { user, setUser, subscriptionStatus } = useContext(UserContext);
    const isMobile = useMediaQuery('(max-width:780px)');
    const pathsHideByDefault = ['/', '/register', '/ad-generator', '/library', '/reset-password', '/forgot-password', '/updated-subscription', '/sign-in']; // adjust this array to meet your needs
    const [showLinks, setShowLinks] = useState(!pathsHideByDefault.includes(router.pathname));
    const [hovered, setHovered] = useState(false);

    const handleSignOut = () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            signOut();
            setUser(null);
            router.push('/sign-in');
        }
    };

    const toggleShowLinks = () => {
        setShowLinks(!showLinks);
    };

    // Listener for route changes to hide/show links
    useEffect(() => {
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        }
    }, []);

    const handleRouteChange = () => {
        setShowLinks(!pathsHideByDefault.includes(router.pathname));
    };

    return (
        <nav className="bg-reviewDrumDarkGray py-2 text-white flex flex-col md:flex-row justify-between items-center sticky top-0 z-50">
            <div className="flex items-center justify-center my-0 md:mb-0 md:pl-3" style={{marginBottom: showLinks ? '6px' : '0px', position: 'relative'} }>
                <LinkItem href="/">
                    <span className="text-reviewDrumMedGray">Review</span>
                    <span className="text-reviewDrumOrange">Drum</span>
                </LinkItem>
                {isMobile &&
                    <div style={{position: 'absolute', right: '-30px'}}>
                        {(showLinks ?
                                <ExpandLessIcon color="inherit" onClick={toggleShowLinks} />
                                :
                                <ExpandMoreIcon color="inherit" onClick={toggleShowLinks} />
                        )}
                    </div>
                }
            </div>
            {(showLinks || !isMobile) && (
                <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'md:flex-row md:space-y-0 md:space-x-2 md:pr-4'} md:justify-end md:items-center w-full`}>
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

                            <span className="inline-block ml-2 text-white cursor-pointer">
                                <a onClick={handleSignOut} id="signout">
                                    Sign Out
                                </a>
                            </span>
                        </>
                    ) : (
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 md:pr-12">
                            <LinkItem href="/learn-more">Learn More</LinkItem>
                            <LinkItem href="/about">About</LinkItem>
                            <LinkItem href="/pricing">Pricing</LinkItem>
                            <LinkItem href="/sign-in">Sign In</LinkItem>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default TopNav;
