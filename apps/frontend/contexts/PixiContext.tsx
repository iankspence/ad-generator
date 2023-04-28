import * as PIXI from 'pixi.js';
import { createContext, useEffect, useState } from 'react';

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

    hookImageContainer: PIXI.Container | null;
    updateHookImageContainer: (container: PIXI.Container) => void;
    claimImageContainer: PIXI.Container | null;
    updateClaimImageContainer: (container: PIXI.Container) => void;
    closeImageContainer: PIXI.Container | null;
    updateCloseImageContainer: (container: PIXI.Container) => void;
    reviewImageContainer: PIXI.Container | null;
    updateReviewImageContainer: (container: PIXI.Container) => void;

    textStyles: { [key: string]: PIXI.TextStyle };
    updateTextStyles: (newTextStyles: { [key: string]: PIXI.TextStyle }) => void;
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

    hookImageContainer: null,
    updateHookImageContainer: () => void 0,
    claimImageContainer: null,
    updateClaimImageContainer: () => void 0,
    closeImageContainer: null,
    updateCloseImageContainer: () => void 0,
    reviewImageContainer: null,
    updateReviewImageContainer: () => void 0,

    textStyles: {},
    updateTextStyles: () => void 0,
});

export const PixiProvider = ({ children }) => {
    const [hookApp, setHookApp] = useState(null);
    const [claimApp, setClaimApp] = useState(null);
    const [closeApp, setCloseApp] = useState(null);
    const [reviewApp, setReviewApp] = useState(null);
    const [selectedThemeId, setSelectedThemeId] = useState('basic-swoosh');
    const [hookImageContainer, setHookImageContainer] = useState(null);
    const [claimImageContainer, setClaimImageContainer] = useState(null);
    const [closeImageContainer, setCloseImageContainer] = useState(null);
    const [reviewImageContainer, setReviewImageContainer] = useState(null);
    const [textStyles, setTextStyles] = useState({});

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
                hookImageContainer,
                updateHookImageContainer: setHookImageContainer,
                claimImageContainer,
                updateClaimImageContainer: setClaimImageContainer,
                closeImageContainer,
                updateCloseImageContainer: setCloseImageContainer,
                reviewImageContainer,
                updateReviewImageContainer: setReviewImageContainer,
                textStyles,
                updateTextStyles: setTextStyles,
            }}
        >
            {children}
        </PixiContext.Provider>
    );
};

export { PixiContext };
export default PixiProvider;
