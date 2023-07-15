import React, { useState, useContext, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import UserContext from '../../contexts/UserContext';
import { useRouter } from 'next/router';
import { signOut } from '../../utils/api/mongo/user/sign-in/signOutApi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LinkItem from './LinkItem';

const TopNav = () => {
    const router = useRouter();
    const { user, setUser, account } = useContext(UserContext);
    const isMobile = useMediaQuery('(max-width:768px)');
    const pathsHideByDefault = ['/', '/register', '/ad-generator', '/library', '/reset-password', '/forgot-password', '/purchase-complete', '/sign-in', '/about', '/how-it-works', '/faq', '/apply', '/privacy', '/terms', '/cookies'];
    const [showLinks, setShowLinks] = useState(!pathsHideByDefault.includes(router.pathname));
    const [isHovered, setIsHovered] = useState(false);

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

    useEffect(() => {
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        }
    }, [router.pathname]);

    const handleRouteChange = () => {
        setShowLinks(!pathsHideByDefault.includes(router.pathname));
    };

    const navStyle = {
        transition: 'opacity 0.5s',
        opacity: isHovered || router.pathname !== '/ad-generator' ? 1 : 0,
    };

    return (
        <nav
            className="bg-reviewDrumDarkGray py-2 text-white flex flex-col md:flex-row justify-between items-center sticky top-0 z-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={navStyle}
        >
            <div className="flex items-center justify-center my-0 md:mb-0 md:pl-3" style={{marginBottom: `${ isMobile ? `${showLinks ? '6px': '0px'}` : '0px'}`, position: 'relative'} }>
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
                <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'md:flex-row md:space-y-0 md:space-x-8 md:pr-2'} md:justify-end md:items-center w-full`}>
                    {user && (user?.roles?.includes('admin') || user?.roles?.includes('content-manager') || user?.roles?.includes('client')) ? (
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 md:pr-2">
                            {user && (user?.roles?.includes('admin') || user?.roles?.includes('content-manager') || user?.roles?.includes('client') && account?.setupPaymentComplete) ?
                                <>
                                    <LinkItem href="/reviews">Reviews</LinkItem>
                                    <LinkItem href="/deliveries">Deliveries</LinkItem>
                                </>
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
                            <LinkItem onClick={handleSignOut}>Sign Out</LinkItem>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 md:pr-2">
                            <LinkItem href="/faq">FAQ</LinkItem>
                            <LinkItem href="/about">About</LinkItem>
                            <LinkItem href="/services">Services</LinkItem>
                            <LinkItem href="/sign-in">Sign In</LinkItem>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default TopNav;
