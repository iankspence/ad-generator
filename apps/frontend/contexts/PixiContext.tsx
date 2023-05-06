import * as PIXI from 'pixi.js';
import { createContext, useEffect, useState } from 'react';
import EventEmitter from 'eventemitter3';
import {themes} from "../utils/constants/themes";

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

    xRanges: { [key: string]: [number, number] };
    yRanges: { [key: string]: [number, number] };
    updateRange: (canvasName: string, xRange: [number, number], yRange: [number, number]) => void;

    lineHeightMultipliers: { [key: string]: number };
    updateLineHeightMultipliers: (canvasName: string, lineHeightMultiplier: number) => void;
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

    xRanges: {
        hook: [0, 0],
        claim: [0, 0],
        review: [0, 0],
        close: [0, 0],
    },
    yRanges: {
        hook: [0, 0],
        claim: [0, 0],
        review: [0, 0],
        close: [0, 0],
    },
    updateRange: () => void 0,

    lineHeightMultipliers: {
        hook: 1.33,
        claim: 1.33,
        review: 1.33,
        close: 1.33,
    },
    updateLineHeightMultipliers: () => void 0,
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
    const [lineHeightMultipliers, setLineHeightMultipliers] = useState({
        hook: 1.33,
        claim: 1.33,
        review: 1.33,
        close: 1.33,
    });

    // Find the default theme
    const defaultTheme = themes.find((theme) => theme.id === 'basic-swoosh');

    const initialXRanges: { [key: string]: [number, number] } = {
        hook: defaultTheme.settings.hookTextDefaults.hookMainText.xRange as [number, number],
        claim: defaultTheme.settings.claimTextDefaults.claimMainText.xRange as [number, number],
        review: defaultTheme.settings.reviewTextDefaults.reviewMainText.xRange as [number, number],
        close: defaultTheme.settings.closeTextDefaults.closeMainText.xRange as [number, number],
    };

    const initialYRanges: { [key: string]: [number, number] } = {
        hook: defaultTheme.settings.hookTextDefaults.hookMainText.yRange as [number, number],
        claim: defaultTheme.settings.claimTextDefaults.claimMainText.yRange as [number, number],
        review: defaultTheme.settings.reviewTextDefaults.reviewMainText.yRange as [number, number],
        close: defaultTheme.settings.closeTextDefaults.closeMainText.yRange as [number, number],
    };

    // Use initialXRanges and initialYRanges when creating the initial PixiContext state
    const [xRanges, setXRanges] = useState(initialXRanges);
    const [yRanges, setYRanges] = useState(initialYRanges);

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
                xRanges,
                yRanges,
                updateRange: (canvasName: string, xRange: [number, number], yRange: [number, number]) => {
                    setXRanges((prev) => ({ ...prev, [canvasName]: xRange }));
                    setYRanges((prev) => ({ ...prev, [canvasName]: yRange }));
                },
                lineHeightMultipliers,
                    updateLineHeightMultipliers: (canvasName: string, lineHeightMultiplier: number) => {
                    setLineHeightMultipliers((prev) => ({ ...prev, [canvasName]: lineHeightMultiplier }));
                },

            }}
        >
            {children}
        </PixiContext.Provider>
    );
};
