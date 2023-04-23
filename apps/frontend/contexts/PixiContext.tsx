import * as PIXI from 'pixi.js';
import { createContext, useState } from 'react';

interface PixiContextProps {
    hookApp: PIXI.Application | null;
    updateHookApp: (newApp: PIXI.Application) => void;
    selectedThemeId: string | null;
    updateSelectedThemeId: (selectedThemeId: string) => void;
}

const PixiContext = createContext<PixiContextProps>({
    hookApp: null,
    updateHookApp: () => void 0,

    selectedThemeId: 'basic-swoosh',
    updateSelectedThemeId: () => void 0,
});

export const PixiProvider = ({ children }) => {
    const [hookApp, setHookApp] = useState(null);
    const [selectedThemeId, setSelectedThemeId] = useState('basic-swoosh');

    return (
        <PixiContext.Provider
            value={{
                hookApp,
                updateHookApp: setHookApp,
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
