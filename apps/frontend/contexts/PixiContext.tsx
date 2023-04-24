import * as PIXI from 'pixi.js';
import { createContext, useState } from 'react';

interface PixiContextProps {
    hookApp: PIXI.Application | null;
    updateHookApp: (newApp: PIXI.Application) => void;
    claimApp: PIXI.Application | null;
    updateClaimApp: (newApp: PIXI.Application) => void;
    closeApp: PIXI.Application | null;
    updateCloseApp: (newApp: PIXI.Application) => void;
    reviewApp: PIXI.Application | null;
    updateReviewApp: (newApp: PIXI.Application) => void;
    selectedThemeId: string | null;
    updateSelectedThemeId: (selectedThemeId: string) => void;
}

const PixiContext = createContext<PixiContextProps>({
    hookApp: null,
    updateHookApp: () => void 0,

    claimApp: null,
    updateClaimApp: () => void 0,

    closeApp: null,
    updateCloseApp: () => void 0,

    reviewApp: null,
    updateReviewApp: () => void 0,

    selectedThemeId: 'basic-swoosh',
    updateSelectedThemeId: () => void 0,
});

export const PixiProvider = ({ children }) => {
    const [hookApp, setHookApp] = useState(null);
    const [claimApp, setClaimApp] = useState(null);
    const [closeApp, setCloseApp] = useState(null);
    const [reviewApp, setReviewApp] = useState(null);
    const [selectedThemeId, setSelectedThemeId] = useState('basic-swoosh');

    return (
        <PixiContext.Provider
            value={{
                hookApp,
                updateHookApp: setHookApp,
                claimApp,
                updateClaimApp: setClaimApp,
                closeApp,
                updateCloseApp: setCloseApp,
                reviewApp,
                updateReviewApp: setReviewApp,
                selectedThemeId,
                updateSelectedThemeId: setSelectedThemeId,
            }}
        >
            {children}
        </PixiContext.Provider>
    );
};

export { PixiContext };
export default PixiProvider;
