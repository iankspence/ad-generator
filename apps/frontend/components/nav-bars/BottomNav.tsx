import React, { useState, CSSProperties } from 'react';
import { useMediaQuery } from '@mui/material';
import LinkItem from './LinkItem';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const BottomNav = () => {
    const isMobile = useMediaQuery('(max-width:780px)');
    const [showLinks, setShowLinks] = useState(true);
    const [hovered, setHovered] = useState(false);

    const toggleShowLinks = () => {
        setShowLinks(!showLinks);
    };

    const iconButtonContainerStyle: CSSProperties = {
        position: 'fixed' as const,
        bottom: '50px',
        left: '15px',
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
        <nav className={`bg-reviewDrumDarkGray py-2 text-white flex ${isMobile ? 'flex-col-reverse' : 'flex-row'} justify-between items-center sticky bottom-0 z-50`}>
            <div className={`md:pl-3 text-center`}>
                <span className="text-reviewDrumMedGray">Copyright © 2023 - ReviewDrum Inc.</span>
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
