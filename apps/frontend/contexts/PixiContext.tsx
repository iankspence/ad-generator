import * as PIXI from 'pixi.js';
import { createContext, useEffect, useState } from 'react';

interface ActiveCanvases {
    hook: boolean;
    claim: boolean;
    review: boolean;
    close: boolean;
}

interface PixiContextProps {
    canvasApps: { [key: string]: PIXI.Application | null; }
    updateCanvasApp: (key: string, newApp: PIXI.Application) => void;

    imageContainers: { [key: string]: PIXI.Container | null; };
    updateImageContainer: (key: string, newImageContainer: PIXI.Container) => void;

    selectedThemeId: string | null;
    updateSelectedThemeId: (selectedThemeId: string) => void;

    textStyles: { [key: string]: PIXI.TextStyle };
    updateTextStyles: (newTextStyles: { [key: string]: PIXI.TextStyle }) => void;

    activeCanvases: ActiveCanvases | null;
    updateActiveCanvases: (
        newActiveCanvases: ActiveCanvases | null,
    ) => void;
}

export const PixiContext = createContext<PixiContextProps>({
    canvasApps: {},
    updateCanvasApp: () => void 0,

    imageContainers: {},
    updateImageContainer: () => void 0,

    selectedThemeId: 'basic-swoosh',
    updateSelectedThemeId: () => void 0,

    textStyles: {},
    updateTextStyles: () => void 0,

    activeCanvases: {
        hook: true,
        claim: false,
        review: false,
        close: false,
    },
    updateActiveCanvases: () => void 0,
});

export const PixiProvider = ({ children }) => {
    const [canvasApps, setCanvasApps] = useState({});
    const [imageContainers, setImageContainers] = useState({});
    const [selectedThemeId, setSelectedThemeId] = useState('basic-swoosh');
    const [textStyles, setTextStyles] = useState({});
    const [activeCanvases, setActiveCanvases] = useState({
        hook: true,
        claim: false,
        review: false,
        close: false,
    });

    const updateCanvasApp = (key: string, newApp: PIXI.Application) => {
        setCanvasApps((prev) => ({ ...prev, [key]: newApp }));
    }
    const updateImageContainer = (key: string, newImageContainer: PIXI.Container) => {
        setImageContainers((prev) => ({ ...prev, [key]: newImageContainer }));
    };


    return (
        <PixiContext.Provider
            value={{
                canvasApps,
                updateCanvasApp,
                imageContainers,
                updateImageContainer,
                selectedThemeId,
                updateSelectedThemeId: setSelectedThemeId,
                textStyles,
                updateTextStyles: setTextStyles,
                activeCanvases,
                updateActiveCanvases: setActiveCanvases,
            }}
        >
            {children}
        </PixiContext.Provider>
    );
};
