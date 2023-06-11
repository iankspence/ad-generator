import React from 'react';
import { useMediaQuery } from '@mui/material';
import LinkItem from './LinkItem';

const BottomNav = () => {
    const isMobile = useMediaQuery('(max-width:700px)');

    return (
        <nav className={`bg-reviewDrumDarkGray py-2 text-white flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between items-center`}>
            <div className="mb-2 md:mb-0 md:pl-3 text-center">
                <span className="text-reviewDrumMedGray">Copyright © 2023, ReviewDrum Inc.</span>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-8 md:pr-6 text-center md:text-right">
                <LinkItem href="/privacy">Privacy Policy</LinkItem>
                <LinkItem href="/terms">Terms of Service</LinkItem>
                <LinkItem href="/cookies">Cookies Policy</LinkItem>
            </div>
        </nav>
    );
};

export default BottomNav;
