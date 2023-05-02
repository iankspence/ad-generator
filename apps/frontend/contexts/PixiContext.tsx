import * as PIXI from 'pixi.js';
import { createContext, useEffect, useState } from 'react';
import EventEmitter from 'eventemitter3';

interface ActiveCanvases {
    hook: boolean;
    claim: boolean;
    review: boolean;
    close: boolean;
}

interface PixiContextProps {
    canvasApps: { [key: string]: PIXI.Application | null; }
    updateCanvasApp: (key: string, newApp: PIXI.Application) => void;

    selectedThemeId: string | null;
    updateSelectedThemeId: (selectedThemeId: string) => void;

    activeCanvases: ActiveCanvases | null;
    updateActiveCanvases: (
        newActiveCanvases: ActiveCanvases | null,
    ) => void;

    eventEmitter: EventEmitter | null;
}

export const PixiContext = createContext<PixiContextProps>({
    canvasApps: {},
    updateCanvasApp: () => void 0,

    selectedThemeId: 'basic-swoosh',
    updateSelectedThemeId: () => void 0,

    activeCanvases: {
        hook: true,
        claim: false,
        review: false,
        close: false,
    },
    updateActiveCanvases: () => void 0,

    eventEmitter: new EventEmitter(),
});

export const PixiProvider = ({ children }) => {
    const [canvasApps, setCanvasApps] = useState({});
    const [selectedThemeId, setSelectedThemeId] = useState('basic-swoosh');
    const [activeCanvases, setActiveCanvases] = useState({
        hook: true,
        claim: false,
        review: false,
        close: false,
    });

    const eventEmitter = new EventEmitter();

    const updateCanvasApp = (key: string, newApp: PIXI.Application) => {
        setCanvasApps((prev) => ({ ...prev, [key]: newApp }));
    }

    return (
        <PixiContext.Provider
            value={{
                canvasApps,
                updateCanvasApp,
                selectedThemeId,
                updateSelectedThemeId: setSelectedThemeId,
                activeCanvases,
                updateActiveCanvases: setActiveCanvases,
                eventEmitter,
            }}
        >
            {children}
        </PixiContext.Provider>
    );
};
