import React, { useState, CSSProperties, useContext } from 'react';
import { useMediaQuery } from '@mui/material';
import UserContext from '../../contexts/UserContext';
import { useRouter } from 'next/router';
import { signOut } from '../../utils/api/mongo/user/sign-in/signOutApi';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LinkItem from './LinkItem';

const TopNav = () => {
    const router = useRouter();
    const { user, setUser, subscriptionStatus } = useContext(UserContext);
    const isMobile = useMediaQuery('(max-width:780px)');
    const [showLinks, setShowLinks] = useState(true);
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

    const iconButtonContainerStyle: CSSProperties = {
        position: 'fixed' as const,
        top: '10px',
        right: '15px',
        borderRadius: '50%',
        zIndex: 60,
        backgroundColor: hovered ? 'inherit' : 'inherit',
        width: '48px', // default size of IconButton
        height: '48px', // default size of IconButton
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const iconStyle: CSSProperties = {
        fontSize: '32px' // Adjust this value to your liking
    };

    return (
        <nav className="bg-reviewDrumDarkGray py-2 text-white flex flex-col md:flex-row justify-between items-center sticky top-0 z-50">
            <div className="mb-2 md:mb-0 md:pl-3">
                <LinkItem href="/">
                    <span className="text-reviewDrumMedGray">Review</span>
                    <span className="text-reviewDrumOrange">Drum</span>
                </LinkItem>
            </div>
            {isMobile &&
                <div
                    style={iconButtonContainerStyle}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}>
                    <IconButton color="inherit" onClick={toggleShowLinks}>
                        {showLinks ? <ExpandMoreIcon style={iconStyle} /> : <ExpandLessIcon style={iconStyle} />}
                    </IconButton>
                </div>
            }
            {(showLinks || !isMobile) && (
                <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'md:flex-row md:space-y-0 md:space-x-2 md:pr-12'} md:justify-end md:items-center w-full`}>
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
