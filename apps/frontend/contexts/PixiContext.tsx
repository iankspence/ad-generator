import * as PIXI from 'pixi.js';
import { createContext, useEffect, useState } from 'react';
import EventEmitter from 'eventemitter3';
import {themes} from "../utils/themes/themes";
import { AdDocument, UserControlledAttribute } from '@monorepo/type';

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

    displayTextBox: boolean;
    updateDisplayTextBox: (value: boolean) => void;

    maskLocations: {
        maskName: string;
        maskLocation: string;
    }[]
    updateMaskLocations: (maskLocations: {
        maskName: string;
        maskLocation: string;
    } []) => void;

    maskThemeOverrides: {
        [key: string]: {
            color: string | null;
        }
    }
    updateMaskThemeOverrides: (maskThemeOverrides: {
        [key: string]: {
            color: string | null;
        }
    }) => void;

    backgroundImageLocation: string;
    updateBackgroundImageLocation: (backgroundImageLocation: string) => void;

    editAd: AdDocument;
    updateEditAd: (editAd: AdDocument) => void;

    freezeEditAdAttributes: boolean;
    updateFreezeEditAdAttributes: (freezeEditAdAttributes: boolean) => void;

    showFreezeEditAttributeButton: boolean;
    updateShowFreezeEditAttributeButton: (showFreezeEditAttributeButton: boolean) => void;

    userControlledAttributes: UserControlledAttribute[];
    updateUserControlledAttributes: (callback: (prevAttributes: UserControlledAttribute[]) => UserControlledAttribute[]) => void;

}

export const PixiContext = createContext<PixiContextProps>({
    canvasApps: {},
    updateCanvasApp: () => void 0,

    selectedThemeId: 'basic-swoosh-1',
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

    displayTextBox: false,
    updateDisplayTextBox: () => void 0,

    maskLocations: [],
    updateMaskLocations: () => void 0,

    maskThemeOverrides: {},
    updateMaskThemeOverrides: () => void 0,

    backgroundImageLocation: '',
    updateBackgroundImageLocation: () => void 0,

    editAd: null,
    updateEditAd: () => void 0,

    freezeEditAdAttributes: false,
    updateFreezeEditAdAttributes: () => void 0,

    showFreezeEditAttributeButton: false,
    updateShowFreezeEditAttributeButton: () => void 0,

    userControlledAttributes: [],
    updateUserControlledAttributes: () => void 0,

});

export const PixiProvider = ({ children }) => {
    const [canvasApps, setCanvasApps] = useState({});
    const [selectedThemeId, setSelectedThemeId] = useState('basic-swoosh-1');
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
    const [displayTextBox, setDisplayTextBox] = useState(false);
    const [maskLocations, setMaskLocations] = useState([]);
    const [maskThemeOverrides, setMaskThemeOverrides] = useState({});
    const [backgroundImageLocation, setBackgroundImageLocation] = useState('');
    const [userControlledAttributes, setUserControlledAttributes] = useState([]);
    const [ editAd, setEditAd ] = useState<AdDocument>(null);
    const [ freezeEditAdAttributes, setFreezeEditAdAttributes ] = useState(false);
    const [ showFreezeEditAttributeButton, setShowFreezeEditAttributeButton ] = useState(false);

    // Find the default theme
    const defaultTheme = themes.find((theme) => theme.id === 'basic-swoosh-1');

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

    const updateMaskThemeOverrides = (newMaskThemeOverrides: {
        [key: string]: {
            color: string | null;
        }
    }) => {
        setMaskThemeOverrides( (prev) => ({ ...prev, ...newMaskThemeOverrides }) );
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
                displayTextBox,
                updateDisplayTextBox: setDisplayTextBox,
                maskLocations,
                updateMaskLocations: setMaskLocations,
                maskThemeOverrides,
                updateMaskThemeOverrides,

                backgroundImageLocation,
                updateBackgroundImageLocation: setBackgroundImageLocation,

                editAd,
                updateEditAd: (editAd: AdDocument) => {
                    setEditAd(editAd);
                },

                freezeEditAdAttributes,
                updateFreezeEditAdAttributes: setFreezeEditAdAttributes,

                showFreezeEditAttributeButton,
                updateShowFreezeEditAttributeButton: setShowFreezeEditAttributeButton,

                userControlledAttributes,
                updateUserControlledAttributes: setUserControlledAttributes,

            }}
        >
            {children}
        </PixiContext.Provider>
    );
};
