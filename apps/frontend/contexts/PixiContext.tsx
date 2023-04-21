import { createContext, useCallback, useState } from 'react';

interface PixiContextProps {
    localPosition: { x: number; y: number };
    globalPosition: { x: number; y: number };
    dragOffset: { x: number; y: number };
    imagePositionRefCurrent: { x: number; y: number };
    imageX: number;
    imageY: number;
    updateDebugText: (debugText: Partial<PixiContextProps>) => void;
}

const PixiContext = createContext<PixiContextProps>({
    localPosition: { x: 0, y: 0 },
    globalPosition: { x: 0, y: 0 },
    dragOffset: { x: 0, y: 0 },
    imagePositionRefCurrent: { x: 0, y: 0 },
    imageX: 0,
    imageY: 0,
    updateDebugText: () => void 0,
});

const PixiProvider = ({ children }) => {
    const [debugText, setDebugText] = useState<Partial<PixiContextProps>>({
        localPosition: { x: 0, y: 0 },
        globalPosition: { x: 0, y: 0 },
        dragOffset: { x: 0, y: 0 },
        imagePositionRefCurrent: { x: 0, y: 0 },
        imageX: 0,
        imageY: 0,
    } as PixiContextProps);

    return (
        <PixiContext.Provider
            value={{
                localPosition: debugText.localPosition,
                globalPosition: debugText.globalPosition,
                dragOffset: debugText.dragOffset,
                imagePositionRefCurrent: debugText.imagePositionRefCurrent,
                imageX: debugText.imageX,
                imageY: debugText.imageY,
                updateDebugText: setDebugText,
            }}
        >
            {children}
        </PixiContext.Provider>
    );
};

export { PixiContext };
export default PixiProvider;
