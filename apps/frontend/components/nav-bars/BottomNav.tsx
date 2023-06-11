import React from 'react';
import { useMediaQuery } from '@mui/material';
import LinkItem from './LinkItem';

const BottomNav = () => {
    const isMobile = useMediaQuery('(max-width:780px)');

    return (
        <nav className={`bg-reviewDrumDarkGray py-2 text-white flex ${isMobile ? 'flex-col-reverse' : 'flex-row'} justify-between items-center sticky bottom-0 z-50`}>
            <div className={` md:pl-3 text-center`}>
                <span className="text-reviewDrumMedGray">Copyright © 2023 - ReviewDrum Inc.</span>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-10 md:pr-6 text-center md:text-right">
                <LinkItem href="/privacy">Privacy Policy</LinkItem>
                <LinkItem href="/terms">Terms of Service</LinkItem>
                <LinkItem href="/cookies">Cookies Policy</LinkItem>
                <div className="p-1/8"></div>
            </div>

        </nav>
    );
};

export default BottomNav;
