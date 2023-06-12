import React, { useState, CSSProperties, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';
import LinkItem from './LinkItem';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const BottomNav = () => {
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:780px)');
    const pathsKeepOpen = ['/privacy', '/terms', '/cookies'];
    const [showLinks, setShowLinks] = useState(pathsKeepOpen.includes(router.pathname));
    const [isHovered, setIsHovered] = useState(false);  // New state for hover

    const toggleShowLinks = () => {
        setShowLinks(!showLinks);
    };

    useEffect(() => {
        const handleRouteChange = () => {
            setShowLinks(pathsKeepOpen.includes(router.pathname));
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        }
    }, [router.pathname]);

    const iconStyle: CSSProperties = {
        fontSize: '24px',
    };

    const navStyle: CSSProperties = {
        transition: 'opacity 0.5s',
        opacity: isHovered || router.pathname !== '/ad-generator' ? 1 : 0,
    };

    return (
        <nav
            className={`bg-reviewDrumDarkGray py-2 text-white flex ${isMobile ? 'flex-col-reverse' : 'flex-row'} justify-between items-center fixed bottom-0 z-50 w-full`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={navStyle}
        >
            <div className={`md:pl-3 text-center flex justify-between`} style={{ alignItems: 'center' }}>
                <span className="text-reviewDrumMedGray">Copyright © 2023 - ReviewDrum Inc.</span>
                {isMobile &&
                    <IconButton color="inherit" onClick={toggleShowLinks} style={{ padding: '2px' }}>
                        {showLinks ? <ExpandMoreIcon style={iconStyle} /> : <ExpandLessIcon style={iconStyle} />}
                    </IconButton>
                }
            </div>
            {(showLinks || !isMobile) &&
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-10 md:pr-6 text-center md:text-right">
                    <LinkItem href="/privacy">Privacy Policy</LinkItem>
                    <LinkItem href="/terms">Terms of Service</LinkItem>
                    <LinkItem href="/cookies">Cookies Policy</LinkItem>
                    <div className="p-1/8"></div>
                </div>
            }
        </nav>
    );
};

export default BottomNav;
